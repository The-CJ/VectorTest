var CollisionCalculator = new (class {
  constructor() {

  }

  collisionAutodetect() {}

  collision_CircleObject_CircleObject(CO1, CO2, collide_info) {
    // before checking collision vector changes we need to set balls in save positions
    var overlap = 0.5 * ( collide_info.hyp - CO1.radius - CO2.radius );
    CO1.pos_x -= overlap * (CO1.pos_x - CO2.pos_x) / collide_info.hyp;
    CO1.pos_y -= overlap * (CO1.pos_y - CO2.pos_y) / collide_info.hyp;

    CO2.pos_y += overlap * (CO1.pos_y - CO2.pos_y) / collide_info.hyp;
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

})
