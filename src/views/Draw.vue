<template>
    <div class="main container-fluid">
        <div class="row">
            <div class="col canvas-container">
                <div class="row toolbar">
                    <input type="text" name="title" v-model="title" autocomplete="false" />
                    <button @click="saveImage()">Save</button>
                </div>
                <canvas
                    ref="canvas"
                    id="vueCanvas"
                    class="canvas cursor"
                    :width="width"
                    :height="width"
                ></canvas>
                <div class="row toolbar">
                    <div class="col-1 trash">
                        <button @click="clear()">Erase</button>
                    </div>
                    <div class="col-10 color-panel">
                        <div class="row first-row">
                            <div id="red" class="col color-box red"></div>
                            <div id="yellow" class="col color-box yellow"></div>
                            <div id="green" class="col color-box green"></div>
                            <div id="brown" class="col color-box brown"></div>
                            <div id="blue" class="col color-box blue"></div>
                            <div id="black" class="col color-box black"></div>
                        </div>
                        <div class="row second-row">
                            <div id="orange" class="col color-box orange"></div>
                            <div id="purple" class="col color-box purple"></div>
                            <div id="greenyellow" class="col color-box greenyellow"></div>
                            <div id="beige" class="col color-box beige"></div>
                            <div id="turquoise" class="col color-box turquoise"></div>
                            <div id="white" class="col color-box white"></div>
                        </div>
                    </div>
                    <div class="col-1 undo">
                        <button @click="redraw()">Undo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventService from '@/services/EventService.js';
export default {
    data() {
        return {
            width: 600,
            height: 600,
            title: 'immagine',
            context: null,
            isDrawing: false,
            history: [],
            point: {
                x: Number,
                y: Number
            },
            lastStrokeHistory: [0],
            selectedColor: '',
            lineWidth: Number,
            currentOperation: '',
            availableColors: {
                red: '#ff0000',
                orange: '#ffc400',
                yellow: '#ffff00',
                purple: '#c400c4',
                green: '#00c400',
                greenyellow: '#a7ffa4',
                blue: '#0000ff',
                turquoise: '#74f7fc',
                brown: '#994e1c',
                beige: '#f0ba69',
                black: '#000000',
                white: '#ffffff'
            }
        };
    },
    mounted() {
        this.setCanvas();
        this.bindEvents();
    },
    methods: {
        newStroke(eventPoint) {
            return {
                operation: this.context.globalCompositeOperation,
                strokeColor: this.context.strokeStyle,
                strokeWidth: this.context.lineWidth,
                from: {
                    x: this.point.x,
                    y: this.point.y
                },
                to: {
                    x: eventPoint.offsetX,
                    y: eventPoint.offsetY
                }
            };
        },
        setCanvas() {
            this.context = this.$refs.canvas.getContext('2d');
            this.isDrawing = false;
            this.history = [];
            this.point.x = 0;
            this.point.y = 0;
            this.currentOperation = 'source-over';
            this.context.globalCompositeOperation = this.currentOperation;
            this.selectedColor = '#000000';
            this.context.strokeStyle = this.selectedColor;
            this.lineWidth = 8;
            this.context.lineWidth = this.lineWidth;
            this.context.lineCap = 'round';
            this.context.lineJoin = 'round';
        },
        bindEvents() {
            //ColorBoxes//
            const elements = document.getElementsByClassName('color-box');
            elements.forEach(element => {
                element.addEventListener('click', this.setColor);
            });
            //Canvas//
            this.$refs.canvas.addEventListener('mousedown', event => {
                if (window.getSelection().focusNode != null) {
                    console.log(window.getSelection());
                    window.getSelection().removeAllRanges();
                }
                if (!this.isDrawing) {
                    this.isDrawing = true;
                    this.$refs.canvas.addEventListener('mousemove', this.draw);
                }
                [this.point.x, this.point.y] = [event.offsetX, event.offsetY];
                this.draw(event);
                console.log('down: ' + this.isDrawing);
            });
            this.$refs.canvas.addEventListener('mouseup', () => {
                if (this.isDrawing) {
                    this.isDrawing = false;
                    this.$refs.canvas.removeEventListener(
                        'mousemove',
                        this.draw
                    );
                    this.lastStrokeHistory.push(this.history.length);
                }
                console.log('up: ' + this.isDrawing);
            });
            this.$refs.canvas.addEventListener('mouseout', () => {
                if (this.isDrawing) {
                    this.isDrawing = false;
                    this.$refs.canvas.removeEventListener(
                        'mousemove',
                        this.draw
                    );
                    this.lastStrokeHistory.push(this.history.length);
                }
                console.log('out: ' + this.isDrawing);
            });
        },
        draw(event) {
            console.log('move: ' + this.isDrawing);
            if (!this.isDrawing) return;
            else {
                this.context.beginPath();
                let stroke = this.newStroke(event);
                this.context.moveTo(stroke.from.x, stroke.from.y);
                this.context.lineTo(stroke.to.x, stroke.to.y);
                this.context.stroke();
                [this.point.x, this.point.y] = [stroke.to.x, stroke.to.y];
                this.history.push(stroke);
            }
        },
        setColor(event) {
            this.selectedColor = this.availableColors[event.target.id];
            if (this.selectedColor == undefined)
                this.context.strokeStyle = this.selectedColor = '#000000';
            else this.context.strokeStyle = this.selectedColor;
        },
        redraw() {
            if (this.lastStrokeHistory.length < 2) return;
            let index = this.lastStrokeHistory[
                this.lastStrokeHistory.length - 2
            ];
            if (this.history.length < index) return;
            this.context.clearRect(0, 0, this.width, this.height);
            this.history.length = index;
            this.lastStrokeHistory.pop();
            this.history.forEach(stroke => this._redraw(stroke));
            this.context.globalCompositeOperation = this.currentOperation;
            this.context.strokeStyle = this.selectedColor;
            this.context.lineWidth = this.lineWidth;
        },
        _redraw(stroke) {
            //SOLO AUSILIARIA
            this.context.globalCompositeOperation = stroke.operation;
            this.context.strokeStyle = stroke.strokeColor;
            this.context.lineWidth = stroke.strokeWidth;
            this.context.beginPath();
            this.context.moveTo(stroke.from.x, stroke.from.y);
            this.context.lineTo(stroke.to.x, stroke.to.y);
            this.context.stroke();
        },
        clear() {
            this.context.clearRect(0, 0, this.width, this.height);
            this.lastStrokeHistory = [0];
            this.history = [];
        },
        saveImage() {
            /*  Per sfondo BIANCO => defualt: trasparente
                let myData = this.context.getImageData(
                0,
                0,
                this.width,
                this.height
            );
            let data = myData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] < 255) {
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                    data[i + 3] = 255;
                }
            }
            this.context.putImageData(myData, 0, 0);*/
            this.$refs.canvas.toBlob(blob => {
                this.sendForm(blob);
            });
        },
        sendForm(blob) {
            let bodyFormData = new FormData();
            bodyFormData.set('title', this.title);
            bodyFormData.append('file', blob);
            EventService.saveToGallery(bodyFormData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    }
};
</script>

<style scoped>
.row {
    margin: 0;
}
.undo,
.trash {
    display: flex;
    justify-content: center;
    align-items: center;
}
.toolbar {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 5px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}
button {
    border-radius: 5px;
    background-color: rgb(200, 219, 253);
    color: rgb(53, 66, 94);
    border-color: rgb(200, 219, 253);
    margin: 2px;
}
.user-container {
    display: flex;
}
.chat-container {
    display: flex;
}
.canvas-container {
    min-height: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
/* CANVAS */
.canvas {
    background-color: white;
    user-select: none;
    border-radius: 5px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}
/* COLOR BOXES */
.color-box {
    width: 60px;
    height: 35px;
    margin-top: 4px;
    margin-left: 4px;
    cursor: pointer;
    border-radius: 25px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}
.red {
    background-color: #ff0000;
}
.orange {
    background-color: #ffc400;
}
.yellow {
    background-color: #ffff00;
}
.purple {
    background-color: #c400c4;
}
.green {
    background-color: #00c400;
}
.greenyellow {
    background-color: #a7ffa4;
}
.blue {
    background-color: #0000ff;
}
.turquoise {
    background-color: #74f7fc;
}
.brown {
    background-color: #994e1c;
}
.beige {
    background-color: #f0ba69;
}
.black {
    background-color: #000000;
}
.white {
    background-color: #ffffff;
}
.grey-border {
    border: solid 2px lightgray;
}
.selected {
    border: 4px solid lightsalmon;
}
</style>