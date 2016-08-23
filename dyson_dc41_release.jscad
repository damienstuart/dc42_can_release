function clipSegment() {
    outer = union(
        difference(
            CSG.cube({
                corner1:[0,0,0],
                corner2:[10,7.75,38],
            }),
            CSG.cube({corner1: [-1, 0, 0], corner2:[11, 4, 13.5]}).translate([0,2,2])
        ),
        union(
            CSG.cube({corner1: [0, 0, -0.2], corner2:[10, 2.5, 12.5]}).translate([0,2.75,2]),
            rtri()
        )
    );
    inner = CSG.cube({corner1:[1.75,0,0], corner2:[8.25,6,38]});

    return difference(outer, inner);
}

function rtri() {
    var h = CAG.fromPoints([ [0,0],[14,0],[7,10],[0,0] ]);
    return linear_extrude({ height: 2.5 }, h).rotateX(-90).translate([-2,2.75,14.5]);
}

function front_ribs() {
    var s = CAG.fromPoints([ [0,0],[0,29],[1.5,29],[1.5,3],[0.75,0],[0,0] ]);
    var ribl = linear_extrude({height: 3.25}, s).rotateX(90).rotateZ(90).translate([-1.75,-2.5,9]);
    var ribr = ribl.translate([9.75,0,0]);
    return union(ribl,ribr).translate([0.25,1.75,0]);
}

function back_plate() {
    var s = CAG.fromPoints([ [0,0],[-3,7],[-3,12],[13,12],[13,7],[10,0],[0,0] ]);
    var plate = linear_extrude({height: 1.5}, s).rotateX(90);
    var r = CAG.fromPoints([ [0,0],[0,7],[3,7],[0,0] ]);
    var rib = linear_extrude({height: 1.5}, r).rotateX(90).rotateZ(90).translate([4.25,0,5])
    return union(plate, rib).translate([0,7.75,26]);
}

function bottom_sec() {
    var s_outer = CAG.fromPoints([
                [0,0],[0,-7],[9,-13],[16,-18],[25,-18],
                [25,-12],[18,-12],[7.75,-5],[7.75,0],[0,0] ]);
    var plate = linear_extrude({height: 10}, s_outer);
    var cyl = CSG.cylinder({
        start: [25,-18,5], end: [25,-12,5],
        radius: 5, resolution: 96
    })
    var sec = union(plate, cyl);

    var s_inner = CAG.fromPoints([
                [0,0],[0,-7],[9,-13],[16,-18],[25,-18],
                [25,-13.5],[18,-13.5],[6.25,-6.55],[6,0],[0,0] ]);
    var p_inner = linear_extrude({height: 6.5}, s_inner);
    var cyl_inner = CSG.cylinder({
        start: [25,-18,3.25], end: [25,-13.5,3.25],
        radius: 3.25, resolution: 96
    })
    var sec_inner = union(p_inner, cyl_inner).translate([0,0,1.75]);

    return difference(sec, sec_inner).rotateY(-90).rotateX(90).rotateZ(180);
}

function top_back() {
    var s = CAG.fromPoints([ [5,12],[5,3],[0,3],[0,0],[10,0],
                             [10,2],[9.65,4],[9,6],[8,8],[6.8,10],[6,11],[5,12] ]);
    return linear_extrude({height: 16}, s).rotateX(90).rotateZ(90)
                .translate([-3,2,38]);
}

function top_front_base() {
    var s = CAG.fromPoints([ [0,0],[5.5,0],[5.5,5.25],[18.5,5.25],[18.5,0],
                             [24,0],[24,2.5],[23.25,2.5],[23.25,2],
                             [20,2],[20,5.5],[23.25,5.5],[23.25,5.25],
                             [24,5.25],[24,8],[0,8],[0,5.25],
                             [0.75,5.25],[0.75,5.5],[4,5.5],[4,2],
                             [0.75,2],[0.75,2.5],[0,2.5],[0,0] ]);
    return linear_extrude({height: 10}, s)
                .translate([-7,-6,38]);
}

function top_front1() {
    var s1 = CAG.fromPoints([ [0,0],[10,13],[18,13],[8,0],[0,0] ]);
    var s2 = CAG.fromPoints([ [6,0],[16,13],[18,13],[8,0],[6,0] ]);

    var p1 = linear_extrude({height: 16}, s1).rotateX(90).rotateZ(-90);
    var p2 = linear_extrude({height: 24}, s2).rotateX(90).rotateZ(-90)
                .translate([4,0,0]);

    var sp = CAG.fromPoints([ [0,0],[0,10],[19.5,11],[0,0] ]);
    var strut = linear_extrude({height: 2}, sp).rotateX(90).rotateZ(-90)
                .translate([-7,-13,7.25]);
    return union(p1,p2,strut).translate([13,2,48]);
}

function top_front() {
    var s1 = CAG.fromPoints([ [0,0],[0,14],[1,15.5],[2,16.5],[3.5,17.75],[6,18.75],
                              [7,19],[26,19],[26,18],[10,13],[8,12],[6,10],[2.5,3],
                              [0,0]
                            ]);
    var f2 = linear_extrude({height: 26}, s1).rotateX(90).rotateZ(-90)
                .translate([18,-6,48]);

    var c1 = CSG.cylinder({
                start: [5,-6,70],
                end: [5,-6,62],
                radius: 13,
                resolution: 64
    });
    var c2 = CSG.cube({center:[5,-6,66], radius:[13,7.5,4]}).translate([0,-7.5,0]);
    var c3 = difference(c2,c1)
    .translate([0,-12,0]);

    f2 = difference(f2, c3);
    var s2 = CSG.cylinder({
                start: [5,-6,48],
                end: [5,-6,55],
                radius: 5,
                resolution: 32
     });

    var cpln = CSG.Plane.fromPoints([5,-11,54.5], [0,-1,49.75], [10,-1,49.75]);

    s2 = s2.cutByPlane(cpln.flipped());

    var s3 = CSG.cylinder({
                start: [5,-6,28],
                end: [5,-6,56],
                radius: 1,
                resolution: 32
    });

    var s4 = CSG.cylinder({
                start: [5,-6,34],
                end: [5,-6,55],
                radius: 2.25,
                resolution: 32
    });

    var indent = CSG.sphere({center:[5,-22,106.25], radius:40, resolution:64});

    var x1 =  union(
        difference(union(top_front1(),f2), s2),
        s3, s4);
    return difference(x1,indent);
}

function main() {
    return union(
        clipSegment(),
        front_ribs(),
        back_plate(),
        bottom_sec(),
        top_back(),
        top_front_base(),
        top_front()
    ).rotateY(90).translate([0,0,18]);
}
