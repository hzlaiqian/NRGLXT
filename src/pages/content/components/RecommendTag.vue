<template>
    <div>
        <div class='flex space-between mb-20 '>
            <div class='flex items-center'>
                <div class='flex items-center'>
                    <img style='width: 22px;height: 21px' src='../../../assets/img/mark.png'>
                </div>
                <h3 class='ml-5'>推荐标签：</h3>
            </div>
            <div class='flex items-center'>
                <div class='mr-6'>
                    <el-tooltip class='pointer ' effect='dark'
                                placement='bottom'>
                        <div slot='content'>基于算法模型和数据实验评估，结合实际文本得出标签结果和分值</div>
                        <div class='b'>?</div>
                    </el-tooltip>
                </div>
                <div class='text mr-6'>自动打标：</div>
                <button class='but pointer' @click='marking'>一键打标</button>
            </div>
        </div>

        <div v-for='p in recommendList' :key='p.id' class=' flex flex-wrap'
             style='width: 100%; display: flex;align-items: center;margin-bottom: 9px'>
            <div style='width:auto;text-align: center;min-width: 60px;margin-right: 5px;'>
                <h5>{{ p.name }}:</h5>
            </div>

            <el-tooltip style='margin-right: 5px;' v-for='c in p.child'
                        :key='c.id'
                        class='pointer ' effect='dark'
                        placement='top'>
                <div slot='content'> {{ c.name }}</div>
                <div>
                    <transition mode='out-in' name='el-zoom-in-center' appear>
                        <tag @del='tagClose(c.id,1)' type='tag' :title='c.name '
                             :color='c.color' :bg-color='c.bColor'></tag>
                    </transition>
                </div>
            </el-tooltip>
        </div>

        <div class='grid-content bg-purple'
             style='align-items: center;margin: 5px 0;display: flex;'>
            <el-autocomplete class='searcch' v-model='txtSearch'
                             :fetch-suggestions='showRecommend' placeholder='请输入内容'
                             @blur='inputFocus = false'
                             @focus='inputFocus = true'
                             value-key='name'
                             :trigger-on-focus='false' @select='handleSelect' size='small'
            >
                <i slot='suffix' :style=' inputFocus?"color: rgba(42, 121, 238, 1)" : ""'
                   class='el-input__icon el-icon-search'></i>
                <template slot-scope='scope'>
                    <span>{{ scope.item.name }}</span>
                    <span style='float: right;color: #919AAD;'>{{ scope.item.ideaName }}</span>
                </template>
            </el-autocomplete>
        </div>
    </div>
</template>

<script>
import { getConceptByName } from '@/api/getData';
import tag from '@/components/Tag.vue'
export default {
    name: 'RecommendTag',
    components: {
        tag
    },
    props: {

    },
    data() {
        return {
            txtSearch: '',
            inputFocus: false,
            recommendList: []
        };
    },
    methods: {
        marking() {
            this.$emit('marking')
        },
        async showRecommend(str, cb) {
            if (str == null || str === '') return;
            let res = await getConceptByName({
                name: str
            });
            if (res != null && res.code === 200) {
                cb(res.data);
            }
        },
        tagClose(cid) {
            let list = [];
            this.recommendList.forEach((p) => {
                let cIndex = p.child.findIndex((c) => c.id === cid);
                if (cIndex !== -1) {
                    let pIndex = this.recommendList.findIndex((k) => k.id === p.id);
                    if (pIndex !== -1) {
                        p.child.splice(cIndex, 1);
                        if (this.recommendList[pIndex].child.length === 0) {
                            list.push(pIndex);
                        }
                    }
                }
            });
            list.forEach((r) => {
                this.recommendList.splice(r, 1);
            });
        },
        handleSelect(item) {
            let child = [];
            const c = {};
            c.id = item.id;
            c.name = item.name;
            c.color = item.color;
            c.bColor = item.bColor;
            child.push(c);

            let index = this.recommendList.findIndex((s) => s.id === item.ideaID);
            if (index !== -1) {
                if (this.recommendList[index].child == null ||
                    this.recommendList[index].child.length === 0) {
                    this.recommendList[index].child = child;
                } else {
                    let kindex = this.recommendList[index].child.findIndex((g) => g.id === c.id);
                    if (kindex === -1) {
                        this.recommendList[index].child.push(c);
                    }
                }
            } else {
                const p = {};
                p.id = item.ideaID;
                p.name = item.ideaName;
                p.color = item.color;
                p.bColor = item.bColor;
                p.child = child;
                this.recommendList.push(p);
            }
            console.log(this.recommendList)
        },
    }
};
</script>

<style scoped>
.mr-6 {
    margin-right: 6px;
}

.b {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    text-align: center;
    line-height: 12px;
    padding: 2px;
    border: 1px solid #2A79EE;
    color: #2A79EE;
}

.but {
    width: 64px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #2A79EE;
    font-size: 12px;
    font-weight: 400;
    color: #2A79EE;
    background-color: #fff;
}

.text {
    font-size: 12px;
    font-weight: 400;
    color: #677287;
    line-height: 16px;
}
</style>
