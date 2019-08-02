function setup() {
    createCanvas(500, 500);

    const a = tf.tensor([1, 0, 1, 0, 1, 1], [2, 3], "int32");
    const b = tf.tensor([1, 0, 0, 0, 1, 1], [2, 3], "int32");
    // const c = tf.add(a, b);
    // const d = tf.sub(a, b);
    // const e = tf.mul(a, b);

    const f = tf.matMul(a, tf.transpose(b));
    // f.print();
    // f.data().then(function (data) {
    //     console.log(data);
    // });
    // console.log(f.dataSync());
    // d.print();
    // e.print();
}

function draw() {
    background(80);
}
