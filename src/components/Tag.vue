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
            <div class='title'>
                {{ title }}
            </div>
            <div>
                <div @click='del' class='close'>x</div>
            </div>
        </div>
        <div v-if='type === "tag"' class='isClose-tag' :style='"background-color:" + bgColor '>
            <div class='title' :style='"color:" + color '>
                {{ title }}
            </div>
            <div v-if='showClose'>
                <div :style='"color:" + color ' @click='del' class='close'>x</div>
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
            default: 'addTag'
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

        .close {
            font-family: SimSun, Microsoft Yahei, PingFangSC-Regular, PingFang SC, serif;
            color: #2A79EE;
            font-size: 18px;
            height: 16px;
            line-height: 14px;
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
