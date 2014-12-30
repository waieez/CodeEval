var Hanoi = function(numDisks) {
    this.A = this.init(numDisks);
    this.B = [];
    this.C = [];
}

Hanoi.prototype.init = function(numDisks){
    for (var i = 1, arr = []; i <= numDisks; arr.push(i++)) {};
    return arr;
}

Hanoi.prototype.move = function(from, to){
    to.unshift( from.shift() );
}

Hanoi.prototype.solve = function(disks, home, target, away){

    if (disks == 0) {
        return
    } else {
        this.solve(disks-1, home, away, target);
        this.move(home, target);
        this.solve(disks-1, away, target, home);
    }
}

Hanoi.prototype.show = function(){
    console.log(this.A, this.B, this.C);
}

var hanoi = new Hanoi(6);
hanoi.solve(hanoi.A.length, hanoi.A, hanoi.B, hanoi.C);
hanoi.show();