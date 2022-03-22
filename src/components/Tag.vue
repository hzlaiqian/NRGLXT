<template>
    <div class='tag'>
        <div v-if='type === "addTag"' class='add-tag' :style='"background-color:" + bgColor ' @click='add'>
            <div class='title'>
                {{ title }}
            </div>
            <div v-if='showAdd'>
                <img style='width: 12px;height: 12px' src='../assets/img/add@2x.png'>
            </div>
        </div>
        <div v-if='type === "closeTag"' class='isClose-tag'>
            <div class='title' >
                {{ title }}
            </div>
            <div class='close-box' @click='del'>
                <div :style='"background-color:" + color '  class='close1'></div>
                <div :style='"background-color:" + color '  class='close2'></div>
            </div>
        </div>
        <div v-if='type === "tag"' class='isClose-tag' :style='"background-color:" + bgColor '>
            <div class='title' :style='"color:" + color '>
                {{ title }}
            </div>
            <div v-if='showClose' class='close-box' @click='del'>
                <div :style='"background-color:" + color '  class='close1'></div>
                <div :style='"background-color:" + color ' class='close2'></div>
            </div>
        </div>
        <div v-if='type === "commonTag"' @click='click' class='common-tag' :style='"background-color:" + bgColor '>
            <div class='title' :style='"color:" + color '>
                {{ title }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tag',
    props: {
        title: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'addTag'
        },
        color: {
            type: String,
            default: '#2A79EE'
        },
        bgColor: {
            type: String,
            default: 'addTag'
        },
        showClose: {
            type: Boolean,
            default: true
        },
        showAdd: {
            type: Boolean,
            default: true
        }
    },
    created() {
        console.log(this.color);
    },
    methods: {
        add() {
            this.$emit('add');
        },
        del() {
            this.$emit('del');
        },
        click() {
            this.$emit('click');
        }
    }
};
</script>

<style scoped lang='scss'>
.tag {
    .add-tag {
        height: 24px;
        border-radius: 2px;
        border: 1px solid #EAEDF7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 6px;
        box-sizing: border-box;
        cursor: pointer;

        .title {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #3C4556;
            line-height: 12px;
            margin-right: 12px;
        }
    }

    .isClose-tag {
        height: 24px;
        border-radius: 2px;
        display: flex;
        background-color: rgba(42, 121, 238, 0.11);
        justify-content: space-between;
        align-items: center;
        padding: 0 6px;
        box-sizing: border-box;
        cursor: pointer;

        .title {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #2A79EE;
            line-height: 12px;
            margin-right: 12px;
        }
        .close-box {
            position: relative;
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
            .close1 {
                width: 14px;
                height: 1px;
                position: absolute;
                transform: translate(-50%,-50%);
                top: 50%;
                left: 50%;
            }
            .close2 {
                width: 14px;
                height: 1px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%) rotate(90deg);
            }
        }

    }
    .common-tag {
        height: 24px;
        border-radius: 2px;
        display: flex;
        background-color: rgba(42, 121, 238, 0.11);
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;

        .title {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #2A79EE;
            line-height: 12px;
            padding: 6px 8px;
        }
    }
}
</style>
