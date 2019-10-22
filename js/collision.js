var CollisionCalculator = new (class {
  constructor() {

  }

  collisionDetect(O1, O2) {
    var collide_info = null;

    // circle x circle
    if (O1 instanceof CircleObject && O2 instanceof CircleObject) {
      collide_info = this.test_collision_CircleObject_CircleObject(O1, O2);
      if (collide_info) {
        O1.eventCollisionObject(O2, collide_info);
        return this.calc_collision_CircleObject_CircleObject(O1, O2, collide_info);
      } else {
        return false;
      }
    }

    // rectangle x rectangle
    else if ( (O1 instanceof RectangleObject && O2 instanceof RectangleObject) ) {
      collide_info = this.test_collision_RectangleObject_RectangleObject(O1, O2);
      if (collide_info) {
        O1.eventCollisionObject(O2, collide_info);
        return this.calc_collision_RectangleObject_RectangleObject(O1, O2, collide_info);
      } else {
        return false;
      }
    }

  }

  test_collision_CircleObject_CircleObject(CO1, CO2) {
    var a = Math.abs( CO1.pos_y - CO2.pos_y );
    var b = Math.abs( CO1.pos_x - CO2.pos_x );
    var hyp = Math.sqrt( (Math.pow(a, 2) + Math.pow(b, 2)) );
    // hyp is the distance between both inner points, if this distance is smaller than both radius, they collide
    if (hyp < (CO1.radius + CO2.radius)) {
      return {"hyp":hyp};
    } else {
      return false;
    }
  }
  calc_collision_CircleObject_CircleObject(CO1, CO2, collide_info) {
    // before checking collision vector changes we need to set balls in save positions
    var overlap = 0.5 * ( collide_info.hyp - CO1.radius - CO2.radius );
    CO1.pos_x -= overlap * (CO1.pos_x - CO2.pos_x) / collide_info.hyp;
    CO1.pos_y -= overlap * (CO1.pos_y - CO2.pos_y) / collide_info.hyp;

    CO2.pos_x += overlap * (CO1.pos_x - CO2.pos_x) / collide_info.hyp;
    CO2.pos_y += overlap * (CO1.pos_y - CO2.pos_y) / collide_info.hyp;

    // after replacement, hyp = the sum of both radius
    collide_info.hyp = CO2.radius + CO1.radius;

    // pushed back? good now physics
    // get normalized vectors and generate tangent as well
    var nx = (CO2.pos_x - CO1.pos_x) / collide_info.hyp;
    var ny = (CO2.pos_y - CO1.pos_y) / collide_info.hyp;

    var normalVector = new Vector(nx, ny);
    var tangentVector = new Vector(-ny, nx);

    // get scalar dot product from tangent
    var dpTanCO1 = CO1.vector.x * tangentVector.x + CO1.vector.y * tangentVector.y;
    var dpTanCO2 = CO2.vector.x * tangentVector.x + CO2.vector.y * tangentVector.y;

    // get scalar dot product from normal
    var dpNormCO1 = CO1.vector.x * normalVector.x + CO1.vector.y * normalVector.y;
    var dpNormCO2 = CO2.vector.x * normalVector.x + CO2.vector.y * normalVector.y;

    // get scalar convertion of momentum
    var comCO1 = ( dpNormCO1 * (CO1.mass - CO2.mass) + 2 * CO2.mass * dpNormCO2 ) / (CO1.mass + CO2.mass);
    var comCO2 = ( dpNormCO2 * (CO2.mass - CO1.mass) + 2 * CO1.mass * dpNormCO1 ) / (CO1.mass + CO2.mass);

    // set new vector based by tangent times dot product + the normal speed convertion
    CO1.vector.x = (tangentVector.x * dpTanCO1) + (normalVector.x * comCO1);
    CO1.vector.y = (tangentVector.y * dpTanCO1) + (normalVector.y * comCO1);
    // same but for other part
    CO2.vector.x = (tangentVector.x * dpTanCO2) + (normalVector.x * comCO2);
    CO2.vector.y = (tangentVector.y * dpTanCO2) + (normalVector.y * comCO2);
  }

  test_collision_RectangleObject_RectangleObject(RO1, RO2) {
      var c = false;
      var dx = Math.abs( (RO1.pos_x - RO2.pos_x) );
      var dy = Math.abs( (RO1.pos_y - RO2.pos_y) );
      if ( dx < ((RO1.a/2) + (RO2.a/2)) ) {
        if ( dy < ((RO1.b/2) + (RO2.b/2)) ) {
          c = true;
        }
      }

      if (c) {
        // get hit direction
        return {"hit":"dir"};
      } else {
        return false;
      }
  }
  calc_collision_RectangleObject_RectangleObject(RO1, RO2, collide_info) {

  }
})
