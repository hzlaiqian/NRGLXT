<template>
    <div :class='{fullscreen:fullscreen}' class='tinymce-container' :style='{width:containerWidth,height:"100%"}'>
        <textarea :id='tinymceId' class='tinymce-textarea' />
        <div class='editor-custom-btn-container'>
            <editorImage color='#1890ff' class='editor-upload-btn' @successCBK='imageSuccessCBK' />
        </div>
    </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage';
import plugins from './plugins';
import toolbar from './toolbar';
import load from './dynamicLoadScript';
import request from '../../utils/request';
import { uploadFile } from '@/api/getData';
// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const tinymceCDN = 'http://www.hzlaiqian.com/media/js/tinymce.js';
 const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all@5.4.2/tinymce.min.js';
export default {
    name: 'Tinymce',
    components: { editorImage },
    props: {
        id: {
            type: String,
            default: function() {
                return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
            }
        },
        value: {
            type: String,
            default: ''
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return [];
            }
        },
        menubar: {
            type: String,
            default: 'file edit insert view format table'
        },
        height: {
            type: [Number, String],
            required: false,
            default: 360
        },
        width: {
            type: [Number, String],
            required: false,
            default: 'auto'
        }
    },
    data() {
        return {
            hasChange: false,
            hasInit: false,
            tinymceId: this.id,
            fullscreen: false,
            languageTypeList: {
                'zh': 'zh_CN',
                'en': 'en',
                'es': 'es_MX',
                'ja': 'ja'
            }
        };
    },
    computed: {
        language() {
            return this.languageTypeList['zh'];
        },
        containerWidth() {
            const width = this.width;
            if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
                return `${width}px`;
            }
            return width;
        }
    },
    watch: {
        value(val) {
            // if (!this.hasChange && this.hasInit) {
            //
            // }
            this.$nextTick(() =>
                window.tinymce.get(this.tinymceId).setContent(val || ''));
        },
        language() {
            this.destroyTinymce();
            this.$nextTick(() => this.initTinymce());
        }
    },

    mounted() {
        this.initTinymce();
    },
    activated() {
        if (window.tinymce) {
            this.initTinymce();
        }
    },
    deactivated() {
        this.destroyTinymce();
    },
    destroyed() {
        this.destroyTinymce();
    },
    methods: {
        init() {
            // dynamic load tinymce from cdn
            load(tinymceCDN, (err) => {
                if (err) {
                    this.$message.error(err.message);
                    return;
                }

            });
        },
        initTinymce() {
            const _this = this;
            window.tinymce.init({
                language: this.language,
                selector: `#${this.tinymceId}`,
                toolbar_mode: 'sliding',
                content_style: '* {font-family: "Microsoft Yahei","PingFang SC";} img {max-width:100% !important } table {width: 100%}',
                height: this.height,
                body_class: 'panel-body ',
                object_resizing: false,
                contextmenu: 'copy paste',
                removed_menuitems: 'spellchecker,print,Insert template,codesample',
                toolbar: 'searchreplace bold italic underline strikethrough alignleft aligncenter alignright  undo redo  code codesample  fontsizeselect | link image media table forecolor backcolor  fullscreen | hr removeformat subscript superscript outdent indent  blockquote  bullist numlist  charmap preview anchor pagebreak insertdatetime  emoticons preview',
                menubar: this.menubar,
                plugins: plugins,
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
                default_link_target: '_blank',
                link_title: false,
                toolbar_drawer: 'sliding',

                nonbreaking_force_tab: true,
                images_upload_handler:async function(blobInfo,success,failurl) {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    try {
                        let form = new FormData()
                        form.append('file',blobInfo.blob())
                        form.append('filename',blobInfo.filename())
                        form.append('uploadType',1)
                        let data = await uploadFile(form)
                        if(data.code === 200) success(data.data)
                        loading.close();
                    } catch (err) {
                        console.error(err)
                        loading.close();
                        this.$message.error('上传失败')
                    }
                },
                file_picker_callback: (callback,value,meta) => {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    try {
                        const input = document.createElement('input')
                        input.setAttribute('type','file')
                        const _this = this
                        input.onchange = async function() {
                            const file = this.files[0]
                            let form = new FormData()
                            form.append('file',file)
                            form.append('filename',file.name)
                            if (meta.filetype === 'media') {
                                form.append('uploadType',2)
                            } else  if (meta.filetype === 'image'){
                                form.append('uploadType',1)
                            }
                            let data = await uploadFile(form)
                            if(data.code === 200) callback(data.data)
                            loading.close();
                        }
                        input.click()
                    } catch (err) {
                        console.error(err)
                        loading.close();
                        this.$message.error('上传失败')
                    }
                },
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value);
                    }
                    _this.hasInit = true;
                    editor.on('NodeChange Change KeyUp SetContent', () => {
                        this.hasChange = true;
                        this.$emit('input', editor.getContent());
                    });
                },
                setup(editor) {
                    editor.on('FullscreenStateChanged', (e) => {
                        console.log(e, '编辑器');
                        _this.fullscreen = e.state;
                    });
                },
                // it will try to keep these URLs intact
                // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
                // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
                convert_urls: false
                // 整合七牛上传
                // images_dataimg_filter(img) {
                //   setTimeout(() => {
                //     const $image = $(img);
                //     $image.removeAttr('width');
                //     $image.removeAttr('height');
                //     if ($image[0].height && $image[0].width) {
                //       $image.attr('data-wscntype', 'image');
                //       $image.attr('data-wscnh', $image[0].height);
                //       $image.attr('data-wscnw', $image[0].width);
                //       $image.addClass('wscnph');
                //     }
                //   }, 0);
                //   return img
                // },
                // images_upload_handler(blobInfo, success, failure, progress) {
                //   progress(0);
                //   const token = _this.$store.getters.token;
                //   getToken(token).then(response => {
                //     const url = response.data.qiniu_url;
                //     const formData = new FormData();
                //     formData.append('token', response.data.qiniu_token);
                //     formData.append('key', response.data.qiniu_key);
                //     formData.append('file', blobInfo.blob(), url);
                //     upload(formData).then(() => {
                //       success(url);
                //       progress(100);
                //     })
                //   }).catch(err => {
                //     failure('出现未知问题，刷新页面，或者联系程序员')
                //     console.log(err);
                //   });
                // },
            });
        },
        destroyTinymce() {
            const tinymce = window.tinymce.get(this.tinymceId);
            if (this.fullscreen) {
                tinymce.execCommand('mceFullScreen');
            }

            if (tinymce) {
                tinymce.destroy();
            }
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value);
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent();
        },
        imageSuccessCBK(arr) {
            arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class='wscnph' src='${v.url}' >`));
        }
    }
};
</script>

<style lang='scss' scoped>
.tinymce-container {
    position: relative;
    line-height: normal;
}

.tinymce-container {
    ::v-deep {
        .mce-fullscreen {
            z-index: 10000;
        }
    }
}

.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}

.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 2005;
}

.fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
}

.editor-upload-btn {
    display: inline-block;
}

.mce-fixed-width {
    width: 80px;
}
</style>
