//Need to fix quicksort

import React from 'react';
import './SortingVis.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';

const DEFAULT_COLOR = "rgb(192,192,192)";
const SECONDARY_COLOR = 'red'
const POINTER_COLOR = 'blue';
const ENDING_COLOR = "rgb(144, 238, 144)";
// const END_DELAY = 100; //number of animation speeds until the ending color disappears.

var ENDING_ANIMATION_SPEED_MS = 10;
var NUM_BARS = 300;

var mergeSort = false;
var quickSort = false;
var bubbleSort = false;
var heapSort = false;



export default class SortingVis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arr: [],
            origArr: [],
            numBars: 2,
            animationSpeed: 1,
        };

        this.updateNumBars = this.updateNumBars.bind(this);
        this.updateAnimationSpeed = this.updateAnimationSpeed.bind(this);
    }

    

    

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        if(quickSort || bubbleSort || heapSort || mergeSort) {
            return;
        }

        const arr = [];
        const origArr = [];
        for(let i = 0; i < NUM_BARS; i++) {
            const randNum = Math.floor(Math.random() * 590) + 10;
            arr.push(randNum); //generates random number from 10 to 730, and pushes number into arr
            origArr.push(randNum);
        }

        // const arr = [16, 7, 22, 3, 19, 9, 33];

        // const origArr = [16, 7, 22, 3, 19, 9, 33];

        this.setState({arr: arr, origArr: origArr});

        // const arrStr = "564px,207px,431px,110px,554px,378px,514px,64px,44px,244px,478px,61px,572px,303px,180px,352px,103px,366px,225px,297px,67px,281px,412px,344px,463px,410px,350px,225px,188px,22px,288px,156px,434px,376px,513px,54px,243px,210px,442px,533px,386px,416px,316px,173px,270px,272px,459px,14px,528px,73px,325px,18px,575px,251px,518px,55px,114px,559px,573px,557px,141px,96px,179px,493px,119px,374px,533px,547px,240px,577px,567px,28px,162px,538px,96px,444px,267px,311px,239px,542px,240px,537px,227px,65px,288px,98px,255px,450px,223px,413px,450px,599px,301px,588px,357px,49px,96px,380px,180px,350px,182px,377px,73px,206px,365px,262px,252px,62px,141px,455px,171px,17px,524px,187px,345px,235px,144px,131px,174px,91px,307px,527px,474px,65px,492px,221px,590px,243px,557px,464px,72px,172px,241px,402px,327px,591px,464px,373px,413px,116px,424px,265px,405px,139px,184px,28px,389px,292px,513px,118px,88px,129px,470px,176px,310px,209px,69px,478px,468px,153px,215px,518px,492px,195px,57px,20px,257px,164px,358px,517px,501px,227px,32px,133px,100px,470px,224px,460px,578px,245px,448px,18px,579px,131px,529px,536px,116px,153px,490px,512px,258px,586px,563px,43px,228px,153px,132px,363px,390px,343px,250px,412px,81px,87px,445px,292px,567px,482px,550px,500px,425px,571px,119px,15px,34px,372px,335px,481px,285px,16px,323px,556px,308px,332px,331px,584px,240px,374px,60px,156px,162px,595px,71px,46px,555px,241px,462px,37px,357px,598px,405px,551px,290px,329px,326px,345px,323px,228px,28px,194px,362px,69px,437px,394px,290px,270px,390px,435px,444px,65px,134px,22px,31px,522px,359px,269px,295px,535px,361px,63px,434px,136px,516px,208px,249px,325px,549px,451px,562px,565px,473px,290px,226px,575px,549px,217px,473px,484px,99px,259px,480px,409px,40px,324px,542px,431px,65px,28px,582px,154px";
        
        // const arrStrSplit = arrStr.split("px,");
        // const arr = [];

        // arrStrSplit.forEach(str => {
        //     arr.push(Number(str));
        // });

        // arr.pop();
        // arr.push(154);
        // console.log(arr);

        // this.setState({arr});
    }

    resetArrayToOriginalState() {
        if(quickSort || bubbleSort || heapSort || mergeSort) {
            return;
        }

        const arrayBars = document.getElementsByClassName('array-bar');
        const newArr = [];

        for(var i = 0; i < this.state.origArr.length; i++) {
            arrayBars[i].style.height = `${this.state.origArr[i]}px`;
            newArr.push(this.state.origArr[i]);
        }

        this.setState({arr: newArr, origArr: this.state.origArr}, () => {
            console.log("reset arr: " + this.state.arr);
        });

        
    }

    mergeSort() {
        if(quickSort || bubbleSort || heapSort || mergeSort) {
            return;
        }
        mergeSort = true;
        const animations = sortingAlgorithms.mergeSortAnimations(this.state.arr);
        const arrayBars = document.getElementsByClassName('array-bar');


        for(var i = 0; i < animations.length; i++) {

            if(animations[i].length == 2) {
                const [barIndex, value] = animations[i];
                const barStyle = arrayBars[barIndex].style;

                setTimeout(() => {
                    barStyle.backgroundColor = SECONDARY_COLOR;
                    barStyle.height = `${value}`;
                }, i * this.state.animationSpeed);

                setTimeout(() => {
                    barStyle.backgroundColor = DEFAULT_COLOR;
                    barStyle.height = `${value}px`;
                }, (i+1) * this.state.animationSpeed);

            } else if(animations[i].length == 3) {
                const [barOneIdx, barTwoIdx, color] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    if(color == 0) {
                        barOneStyle.backgroundColor = DEFAULT_COLOR;
                        barTwoStyle.backgroundColor = DEFAULT_COLOR;
                    } else if(color == 1) {
                        barOneStyle.backgroundColor = SECONDARY_COLOR;
                        barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    } else if(color == 2) {
                        barOneStyle.backgroundColor = POINTER_COLOR;
                        barTwoStyle.backgroundColor = POINTER_COLOR;
                    }
                }, i * this.state.animationSpeed);
            }

            
        }


        for(var j = 0; j < NUM_BARS; j++) {
            const barStyle = arrayBars[j].style;
            setTimeout(() => {
                barStyle.backgroundColor = ENDING_COLOR;
            }, (animations.length * this.state.animationSpeed + j * ENDING_ANIMATION_SPEED_MS));
            
        }

        setTimeout(() => {
            for(var j = 0; j < NUM_BARS; j++) {
                const barStyle = arrayBars[j].style;
                barStyle.backgroundColor = DEFAULT_COLOR;
            }

            mergeSort = false;
            
        }, (animations.length * this.state.animationSpeed + NUM_BARS * ENDING_ANIMATION_SPEED_MS));

        
    }

    quickSort() {
        if(quickSort || bubbleSort || heapSort || mergeSort) {
            return;
        }

        const arrUnsorted = this.state.arr.slice().sort((a, b) => a-b);
        const animations = sortingAlgorithms.quickSortAnimations(this.state.arr);

        const arrayBars = document.getElementsByClassName('array-bar');

        quickSort = true;

        console.log("Comparing native sort with my sort: " + equal(arrUnsorted, this.state.arr));

        for(var i = 0; i < animations.length; i++) {

            if(animations[i].length == 2) {
                const [barIndex, color] = animations[i];
                const barStyle = arrayBars[barIndex].style;

                if(color == 0) {
                    setTimeout(() => {
                        barStyle.backgroundColor = DEFAULT_COLOR;
                    }, i * this.state.animationSpeed);
                } else if(color == 1) {
                    setTimeout(() => {
                        barStyle.backgroundColor = SECONDARY_COLOR;
                    }, i * this.state.animationSpeed);
                } else if(color == 2) {
                    setTimeout(() => {
                        barStyle.backgroundColor = 'green';
                    }, i * this.state.animationSpeed);
                }

            } else if(animations[i].length == 3) {
                const [barOneIdx, barTwoIdx, swap] = animations[i];

                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {

                    
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;

                    if(swap) {
                        var tmpHeight = barOneStyle.height;
                        barOneStyle.height = `${barTwoStyle.height}`;
                        barTwoStyle.height = `${tmpHeight}`;
                    } else {
                        console.log("SWAP is false");
                    }
                    
              }, i * this.state.animationSpeed);

                setTimeout(() => {
                    barOneStyle.backgroundColor = DEFAULT_COLOR;
                    barTwoStyle.backgroundColor = DEFAULT_COLOR;
              }, (i+1) * this.state.animationSpeed);

            } else {
                console.log("Unknown animations length");
            }
        }

        for(var j = 0; j < NUM_BARS; j++) {
            const barStyle = arrayBars[j].style;
            setTimeout(() => {
                barStyle.backgroundColor = ENDING_COLOR;
            }, (animations.length * this.state.animationSpeed + j * ENDING_ANIMATION_SPEED_MS));
            
        }

        setTimeout(() => {
            for(var j = 0; j < NUM_BARS; j++) {
                const barStyle = arrayBars[j].style;
                barStyle.backgroundColor = DEFAULT_COLOR;
            }

            quickSort = false;
            
        }, (animations.length * this.state.animationSpeed + NUM_BARS * ENDING_ANIMATION_SPEED_MS));

        var arrayBarsArr = [];
        for(var i = 0; i < arrayBars.length; i++) {
            arrayBarsArr.push(arrayBars[i].style.height);
        }
        console.log("Array bars arr:" + arrayBarsArr);
    }

    heapSort() {

        if(quickSort || bubbleSort || heapSort || mergeSort) {
            return;
        }

        var animations = sortingAlgorithms.heapSortAnimations(this.state.arr);
        console.log("Sorted array: " + this.state.arr);
        console.log("Animations: " + animations);

        heapSort = true;

        const arrayBars = document.getElementsByClassName('array-bar');

        for(var i = 0; i < animations.length; i++) {
            if(animations[i].length == 3) {
                const [barOneIdx, barTwoIdx, swap] = animations[i];

                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
              }, i * this.state.animationSpeed);

                setTimeout(() => {

                    if(swap) {
                        var tmpHeight = barOneStyle.height;

                        barOneStyle.height = `${barTwoStyle.height}`;
                        barTwoStyle.height = `${tmpHeight}`;
                    }

                    barOneStyle.backgroundColor = DEFAULT_COLOR;
                    barTwoStyle.backgroundColor = DEFAULT_COLOR;
              }, (i+1) * this.state.animationSpeed);

            }
        }

        for(var j = 0; j < NUM_BARS; j++) {
            const barStyle = arrayBars[j].style;
            setTimeout(() => {
                barStyle.backgroundColor = ENDING_COLOR;
            }, (animations.length * this.state.animationSpeed + j * ENDING_ANIMATION_SPEED_MS));
            
        }

        setTimeout(() => {
            for(var j = 0; j < NUM_BARS; j++) {
                const barStyle = arrayBars[j].style;
                barStyle.backgroundColor = DEFAULT_COLOR;
            }

            heapSort = false;
            
        }, (animations.length * this.state.animationSpeed + NUM_BARS * ENDING_ANIMATION_SPEED_MS));

    }

    bubbleSort() {

        if(quickSort || bubbleSort || heapSort || mergeSort) {
            return;
        }

        const animations = sortingAlgorithms.bubbleSortAnimations(this.state.arr);
        const arrayBars = document.getElementsByClassName('array-bar');

        bubbleSort = true;

        for(var i = 0; i < animations.length; i++) {

            const [barOneIdx, barTwoIdx, swap] = animations[i];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;

                
              }, i * this.state.animationSpeed);

            setTimeout(() => {

                if(swap) {
                    var tmpHeight = barOneStyle.height;

                    barOneStyle.height = `${barTwoStyle.height}`;
                    barTwoStyle.height = `${tmpHeight}`;
                }

                barOneStyle.backgroundColor = DEFAULT_COLOR;
                barTwoStyle.backgroundColor = DEFAULT_COLOR;
              }, (i+1) * this.state.animationSpeed);
            
        }

        for(var j = 0; j < NUM_BARS; j++) {
            const barStyle = arrayBars[j].style;
            setTimeout(() => {
                barStyle.backgroundColor = ENDING_COLOR;
            }, (animations.length * this.state.animationSpeed + j * ENDING_ANIMATION_SPEED_MS));
            
        }

        setTimeout(() => {
            for(var j = 0; j < NUM_BARS; j++) {
                const barStyle = arrayBars[j].style;
                barStyle.backgroundColor = DEFAULT_COLOR;
            }

            bubbleSort = false;
            
        }, (animations.length * this.state.animationSpeed + NUM_BARS * ENDING_ANIMATION_SPEED_MS));
    }

    
    updateNumBars(e) {
        console.log("here");
        NUM_BARS = e.target.value;
        console.log(NUM_BARS);
        this.resetArray();
    }

    updateAnimationSpeed(e) {
        this.setState({animationSpeed: e.target.value});
    }

    render() {
        const arr = this.state.arr;       

        return (

            <div className = "array-container">

                <div>
                    <input 
                      className="slider" 
                      type="range" 
                      id="arr-size" 
                      name="Array Size"
                      min="2" 
                      max="300" 
                      defaultValue="300" 
                      step="1" 
                      //onChange={this.updateNumBars} 
                      onInput={this.updateNumBars} 
                    />
                    <label htmlFor="Array Size">Array Size [Currently: {NUM_BARS}]</label>
                    
                </div>

                <div>
                    <input 
                      className="slider" 
                      type="range" 
                      id="animation-speed" 
                      name="Animation Speed" 
                      min="1" 
                      max="300" 
                      defaultValue="10" 
                      step="1" 
                      //onChange={this.updateNumBars} 
                      onInput={this.updateAnimationSpeed}
                    />
                    <label htmlFor="Animation Speed">Animation Speed [Currently: {this.state.animationSpeed} ms/animation]</label>
                </div>

                <div className="arrays">
                    {arr.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{backgroundColor: DEFAULT_COLOR, height: `${value}px`,}}>
                            
                        </div>
                    ))}
                </div>
                

                <div className="button-container">
                    <button className="gradient-button" onClick = {() => this.resetArray()}>Generate New Array</button>
                    <button className="gradient-button" onClick = {() => this.resetArrayToOriginalState()}>Reset Array to Original State</button>
                    <button className="gradient-button" onClick = {() => this.mergeSort()}>Merge Sort</button>
                    <button className="gradient-button" onClick = {() => this.quickSort()}>Quick Sort</button>
                    <button className="gradient-button" onClick = {() => this.heapSort()}>Heap Sort</button>
                    <button className="gradient-button" onClick = {() => this.bubbleSort()}>Bubble Sort</button>
                </div>
            </div>
        );
    }

    
}

function equal(arrayOne, arrayTwo) {    
    for(var i = 0; i < arrayOne.length; i++) {
        if(arrayOne[i] == arrayTwo[i]) {
            continue;
        } else {
            return false;
        }
    }

    return true;
}

function printArr(arr) {
    for(var i = 0; i < arr.length; i++) {
        console.log(i);
    }
}

