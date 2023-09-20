document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

let cellWidth = 0;
let cellHeight = 0;
let index = 0;

function MoveNextPerson() {
    let x = getRandomInt(0, 20);
    let y = getRandomInt(0, 20);
    if (app.ShowPath(x, y, app.entities[index])) {
        app.PersonMove(x, y, app.entities[index]);

        if (index < app.entities.length - 1) {
            index++;
        }
        else {
            index = 0;
        }
    }
    else {
        MoveNextPerson();
    }
}
function Next(point, rotate, person, path) {

    if (person.rotate != rotate) {
        person.rotate = rotate;

        setTimeout(() => {
            person.position.x += point.x;
            person.position.y += point.y;


            setTimeout(() => {
                if (path.length != 0) {
                    Move(person, path);
                }
                else {
                    //MoveNextPerson();
                }
            }, 300);
        }, 300);
    }
    else {
        person.position.x += point.x;
        person.position.y += point.y;


        setTimeout(() => {
            if (path.length != 0) {
                Move(person, path);
            }
            else {
                //MoveNextPerson();
            }
        }, 300);
    }
}
function Move(person, path) {
    let step = path.shift();
    let point = { x: 0, y: 0 };
    let rotate = 0;

    if (person.position.x > step.x) {
        rotate = 90;
        point.x--;
    }
    else if (person.position.x < step.x) {
        rotate = -90;
        point.x++;
    }

    if (person.position.y > step.y) {
        rotate = 180;
        point.y--;
    }
    else if (person.position.y < step.y) {
        rotate = 0;
        point.y++;
    }

    Next(point, rotate, person, path);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function ArrayWithEntity(array, entities) {
    let newArray = { ...array };
    entities.forEach(e => {
        let pos = e.position;
        newArray[pos.x][pos.y] = 0;
    });
    return newArray;
}

var app = new Vue({
    el: "#app",
    data: {
        offsetMap: { x: 0, y: 0 },
        isDragMap: false,
        styleMap: {
            width: "2044px",
            height: "2044px",
            left: "0px",
            top: "0px",
            background: "url(./image/map.jpg)"
        },
        styleCell: {
            width: "100px",
            height: "100px",

        },
        rows: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 1, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 2, 0],
            [0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 1, 2, 0],
            [0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 2, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 2, 2, 2, 0, 0],
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 2, 2, 0, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 0, 0, 0, 0],
            [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 0, 0, 2, 0],
            [0, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 1, 2, 2, 0, 0, 2, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 1, 1, 2, 2, 0, 0, 2, 2, 0],
            [0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 1, 0, 2, 2, 1, 2, 2, 2, 2, 2, 0, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 1, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0],
            [0, 2, 2, 2, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0],
            [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        entities: [
            {
                type: "person",
                position: {
                    x: 6,
                    y: 15
                },
                rotate: 0,
                src: "image/per/user1.png"
            },
            {
                type: "test",
                position: {
                    x: 5,
                    y: 5
                },
                rotate: 0,
                src: "image/per/enemy.png"

            },
            {
                type: "test1",
                position: {
                    x: 9,
                    y: 5
                },
                rotate: 0,
                src: "image/per/enemy_2.png"

            }
            
        ],
        path: [],
        manna: 0,
        health: 0,
        spells: 10,
        showMapCells: false,
        action: [
            { method: "TestMove", src: "image/tools/move.png" },
            { method: "TestHide", src: "image/tools/hide.png" },
        ]
    },
    created() {
        cellWidth = parseInt(this.styleMap.width) / this.rows.length - 0.1;
        cellHeight = parseInt(this.styleMap.height) / this.rows[0].length - 0.2;
        this.styleCell = {
            width: cellWidth + "px",
            height: cellHeight + "px",
        }
        setTimeout(() => {
            listen(this.GetVolume);
        }, 4000);
    },
    methods: {
        GetVolume(volume) {
            if (volume > 30) {
                speakRecognition(this.GetRecognition);
            }
        },
        GetRecognition(words) {
            let text = words.toLowerCase();
            if (text.indexOf("атакуй") != -1) {
                this.entities[0].src = "image/per/user.png";
            }
           
        },
        MapDown(e) {
            if (e.button != 2) return;

            this.offsetMap.x = e.clientX - parseInt(this.styleMap.left);
            this.offsetMap.y = e.clientY - parseInt(this.styleMap.top);
            this.isDragMap = true;
        },
        MapMove(e) {
            if (!this.isDragMap) return;

            const x = e.clientX - this.offsetMap.x;
            const y = e.clientY - this.offsetMap.y;
            this.styleMap.left = x + "px";
            this.styleMap.top = y + "px";
        },
        MapUp(e) {
            this.isDragMap = false;
        },
        MapClass(row, column) {
            let classStyle = "";
            if (this.rows[row][column] == 1) {
                classStyle += "maxpassable "
            }
            else if (this.rows[row][column] == 2) {
                classStyle += "passable "
            }

            if (this.MapPath(row, column)) {
                classStyle += "path "
            }
            return classStyle;
        },
        MapPath(row, column) {
            let point = this.path.find(p => p.x == column && p.y == row);
            if (point) {
                return true;
            }
            return false;
        },
        ShowPath(row, column, person) {
            if (this.rows[row][column] == 0) return false;

            let pos = person.position;
            const start = [pos.y, pos.x];
            const end = [row, column];

            let path = aStar(this.rows, start, end);
            this.path = path.slice(0, 6);//.slice(0, 6);
            return true;
        },
        PersonHover(row, column) {
            let person = this.entities[0];
            this.ShowPath(row, column, person);
        },
        PersonMove(row, column, person) {
            if (this.rows[row][column] == 0) return;

            let pos = person.position;
            const start = [pos.y, pos.x];
            const end = [row, column];

            let path = aStar(this.rows, start, end);

            Move(person, path.slice(0, 6));//.slice(0, 6));
        },
        HeroMove(row, column) {
            let person = this.entities[0];
            this.PersonMove(row, column, person)
        },
        HeroHover(row, column) {
            let person = this.entities[0];
            this.PersonHover(row, column, person)
        },
        TestMove() {
            this.showMapCells = true;
        },
        TestHide() {
            this.showMapCells = false;
        },
        InterfaceClick(method) {
            this[method]();
        },
        EntityStyle(entity) {
            return {
                width: cellWidth + "px",
                height: cellHeight + "px",
                left: entity.position.x * cellWidth + "px",
                top: entity.position.y * cellHeight + "px",
                transform: "rotate(" + entity.rotate + "deg)"
            }
        }
    }
})