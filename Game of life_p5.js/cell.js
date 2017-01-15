class Cell{
  constructor(value_, bg_) {
    this.value = value_;
    this.color = value_;
    this.bg = bg_;
    this.age = 0;
    this.maxAge = Math.random() * (300 - 75) + 75;
  }
  _setValue(value_) {
    this.value = value_;
    if(value_ > 0)
      this.checkAge();
  }
  stasis(value_) {
    this._setValue(value_);
    this.age === 0 ? this.age = 0:this.age += 1;
    return this.value > 0 ? 1:0;
  }
  die() {
    this._setValue(0);
    this.age = 0;
    return 0;
  }
  live() {
    this._setValue(this.value + 5);
    this.age += 1;
    return 1;
  }
  checkAge() {
    /*if(this.age >= this.maxAge) {
      console.log("Dead at age: " + this.age);
      this.die();
    }*/
  }
  setValue(value, numneighbors) {
    this.neighbors = numneighbors;
    if(value > 1 && this.neighbors < 2) {
      return this.die();
    } else if ((value > 0) && (this.neighbors >  3)) {
      return this.die();           // Overpopulation
    } else if ((value == 0) && (this.neighbors == 3)) {
      return this.live(numneighbors);           // Reproduction
    } else if(value > 0) {
      return this.live(); // New generation of survivor
    } else { // Stasis
      return this.stasis(value);
    }
  }
}