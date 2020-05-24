<template>
    <div class="main container-fluid">
        <div class="row">
            <div class="col canvas-container">
                <div class="row toolbar">
                    <img class="selector" :src="widthSelector" alt />
                    <button class="operation-btn" @click="setOperation()">{{operation}}</button>
                    <form @submit.prevent="saveImage">
                        <input
                            class="input-title"
                            type="text"
                            v-model="title"
                            spellcheck="false"
                            placeholder="Inserisci un titolo..."
                            required
                        />
                        <button type="submit">Salva</button>
                    </form>
                </div>
                <canvas
                    v-bind:style="{cursor: selectedCursor}"
                    ref="canvas"
                    id="vueCanvas"
                    class="canvas cursor"
                    :width="width"
                    :height="width"
                ></canvas>
                <div class="row toolbar">
                    <div class="col-2 trash">
                        <button @click="clear()">Elimina</button>
                    </div>
                    <div class="col-8 color-panel">
                        <div class="row first-row">
                            <div
                                id="red"
                                :class="activeBtn == 'red'? 'selected' : ''"
                                class="col color-box red"
                            ></div>
                            <div
                                id="yellow"
                                :class="activeBtn == 'yellow'? 'selected' : ''"
                                class="col color-box yellow"
                            ></div>
                            <div
                                id="green"
                                :class="activeBtn == 'green'? 'selected' : ''"
                                class="col color-box green"
                            ></div>
                            <div
                                id="brown"
                                :class="activeBtn == 'brown'? 'selected' : ''"
                                class="col color-box brown"
                            ></div>
                            <div
                                id="blue"
                                :class="activeBtn == 'blue'? 'selected' : ''"
                                class="col color-box blue"
                            ></div>
                            <div
                                id="black"
                                :class="activeBtn == 'black'? 'selected' : ''"
                                class="col color-box black"
                            ></div>
                        </div>
                        <div class="row second-row">
                            <div
                                id="orange"
                                :class="activeBtn == 'orange'? 'selected' : ''"
                                class="col color-box orange"
                            ></div>
                            <div
                                id="purple"
                                :class="activeBtn == 'purple'? 'selected' : ''"
                                class="col color-box purple"
                            ></div>
                            <div
                                id="greenyellow"
                                :class="activeBtn == 'greenyellow'? 'selected' : ''"
                                class="col color-box greenyellow"
                            ></div>
                            <div
                                id="beige"
                                :class="activeBtn == 'beige'? 'selected' : ''"
                                class="col color-box beige"
                            ></div>
                            <div
                                id="turquoise"
                                :class="activeBtn == 'turquoise'? 'selected' : ''"
                                class="col color-box turquoise"
                            ></div>
                            <div
                                id="white"
                                :class="activeBtn == 'white'? 'selected' : ''"
                                class="col color-box white"
                            ></div>
                        </div>
                    </div>
                    <div class="col-2 undo">
                        <button @click="redraw()">Indietro</button>
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
            activeBtn: '',
            lastScroll: '',
            width: 600,
            height: 600,
            title: '',
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
            this.$refs.canvas.addEventListener('wheel', e => {
                e.preventDefault();
                console.log(e.deltaY);
                if (e.deltaY <= -1) {
                    if (this.lineWidth < 28) {
                        this.lineWidth += 2;
                        this.context.lineWidth = this.lineWidth;
                    }
                } else if (e.deltaY >= 1)
                    if (this.lineWidth > 4) {
                        this.context.lineWidth = this.lineWidth;
                        this.lineWidth -= 2;
                    }
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
            this.activeBtn = event.target.id;
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
        setOperation() {
            if (this.currentOperation == 'source-over') {
                this.currentOperation = 'destination-out';
                this.context.globalCompositeOperation = this.currentOperation;
            } else {
                this.currentOperation = 'source-over';
                this.context.globalCompositeOperation = this.currentOperation;
            }
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
            if (!this.title) return;
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
                    const notification =  {
                        type: 'success',
                        message: res.data
                    }
                    this.$store
                .dispatch('notification/add', notification, {root: true});
                })
                .catch(err => console.log(err));
        }
    },
    computed: {
        operation() {
            return this.currentOperation == 'source-over' ? 'Gomma' : 'Penna';
        },
        selectedCursor() {
            return `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cellipse opacity='${
                this.isDrawing ? '1' : '0.3'
            }' stroke='%23000' ry='15' rx='15' id='svg_2' cy='16' cx='16' stroke-opacity='null' stroke-width='2' fill='none'/%3E%3Cellipse ry='${this
                .lineWidth / 2}' rx='${this.lineWidth /
                2}' id='svg_3' cy='16' cx='16' opacity='${
                this.isDrawing ? '1' : '0.3'
            }' stroke-width='1.5' stroke='%23000' fill='none'/%3E%3C/g%3E%3C/svg%3E") 16 16, pointer`;
        },
        fillSelector() {
            if (this.currentOperation == 'source-over')
                return `%23${this.selectedColor.substring(1)}`;
            else return 'none';
        },

        widthSelector() {
            return `data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cellipse opacity='1' stroke='%23000' ry='15' rx='15' id='svg_2' cy='16' cx='16' stroke-opacity='null' stroke-width='2' fill='none'/%3E%3Cellipse ry='${this
                .lineWidth / 2}' rx='${this.lineWidth /
                2}' id='svg_3' cy='16' cx='16' stroke-opacity='null' stroke-width='1.5' stroke='%23000' fill='${
                this.fillSelector
            }'/%3E%3C/g%3E%3C/svg%3E`;
        }
    }
};
</script>

<style scoped>
.selector {
    width: 32px;
    height: 32px;
}

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
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 5px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}
button {
    color: rgb(215, 226, 245);
    font-weight: 600;
    border-radius: 8px;
    background-color: rgb(200, 219, 253);
    color: rgb(59, 130, 253);
    border-color: rgb(200, 219, 253);
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    transition: 0.25s;
}
button:hover {
    color: rgb(200, 219, 253);
    background-color: rgb(59, 130, 253);
}

.input-title {
    text-align: center;
    font-weight: 500;
    color: rgb(87, 128, 201);
    caret-color: rgb(59, 130, 253);
    outline: none;
    background: transparent;
    border: none;
    padding-bottom: -3px;
    transition: 0.25s ease-in;
}

.input-title:focus {
    border-bottom: 3px solid rgba(120, 170, 255, 0.664);
    text-align: left;
}
.input-title::selection {
    background: rgb(200, 219, 253);
}
.input-title::placeholder {
    color: rgb(134, 176, 250);
}

.operation-btn {
    width: 75px;
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
    margin: 0.25rem;
    cursor: pointer;
    border-radius: 25px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    transition: 75ms ease-out;
    border: 4px solid transparent;
}
.color-box:hover {
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.4);
    transform: scale(1.075);
}
.color-box:active {
    transform: scale(0.9);
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
    border: 4px solid rgb(154, 191, 255);
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.644);
    transform: scale(1.075);
}
</style>