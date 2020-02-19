<template>
    <div>
        <h1>Добавить новый пост</h1>
        
        <el-form ref="form" :model="post" label-width="120px">
            <el-form-item label="Заголовок">
                <el-input 
                    v-model="post.title"
                    :rules="[
                        { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                    ]"
                />
            </el-form-item>
            <el-form-item label="URL">
                <el-input 
                    v-model="post.slug"
                    :rules="[
                        { required: true, message: 'Поле не должно быть пустым', trigger: 'blur' }
                    ]"
                />
            </el-form-item>
            <el-form-item label="Категории">
                <el-checkbox-group v-model="post.categories">
                    <el-checkbox v-for="category in categories" :label="category.title" :key="category._id" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Порядок">
                <el-input-number v-model="post.order" :min="0" :max="50" />
            </el-form-item>
            <el-form-item label="Изображение">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleImageChange"
                    :auto-upload="false"
                >
                    <el-button size="small" type="warning">Загрузить</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png менее чем 500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="Текст">
                <!-- <div class="switch-wrap">
                    <span>Редактор</span>
                    <el-switch v-model="showEditor" />
                </div>
                <div class="editor-wrap" v-if="showEditor">
                    <div class="quill-editor"                         
                        :content="post.text"
                        @change="onEditorChange($event)"
                        v-quill:myQuillEditor="editorOption"
                    />
                </div>
                <el-input
                    v-if="!showEditor"
                    class="editor-code"
                    type="textarea"
                    :rows="10"
                    v-model="post.text"
                /> -->
                <div id="froala"></div>
            </el-form-item>
            <el-form-item label="Описание">
                <el-input
                    type="textarea"
                    :rows="4"
                    v-model="post.description"
                />
            </el-form-item>
            <h3>Мета-данные</h3>
            <el-form-item label="Title">
                <el-input v-model="post.metaTitle" />
            </el-form-item>
            <el-form-item label="Description">
                <el-input
                    type="textarea"
                    :rows="4"
                    v-model="post.metaDescription"
                />
            </el-form-item>
            <el-form-item label="Keywords">
                <el-input v-model="post.keywords" />
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" @click="onSubmit">Создать</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            post: {
                title: '',
                slug: '',
                categories: [],
                order: 0,
                image: null,
                text: '',
                description: '',
                metaTitle: '',
                metaDescription: '',
                keyywords: ''
            },
            loading: false,
            showEditor: true,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['clean'],
                        ['link', 'image', 'video']
                    ]
                }
            }
        }
    },
    async asyncData({store}) {
        const categories = await store.dispatch('category/fetch')
        return {categories}
    },
    head() {
        return {
            script: [
                { src: 'https://cdn.jsdelivr.net/npm/froala-editor@latest/js/froala_editor.pkgd.min.js' }
            ],
            link: [
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/froala-editor@latest/css/froala_editor.pkgd.min.css' }
            ]
        }
    },
    methods: {
        handleImageChange(file, fileList) {
            this.post.image = file.raw
        },
        onSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid && this.post.image) {
                    this.loading = true
                    this.post.text = document.querySelector('#froala .fr-view').innerHTML

                    try {
                        let formData = {...this.post}
                        if (formData.categories.length > 0) {
                            formData.categories = formData.categories.map(category => {
                                let currentCategory = this.categories.find(item => category === item.title)
                                return currentCategory._id
                            })
                        }
                        await this.$store.dispatch('post/create', formData)
                            .then(post => {
                                this.$message.success('Пост создан!')
                                // this.$router.push(`/admin/posts/${post._id}`)
                                window.location.pathname = `/admin/posts/${post._id}`
                            })
                    } catch (e) {} finally {
                        this.loading = false
                    }
                } else {
                    this.$message.warning('Форма не валидна')
                }
            })
        },
        onEditorChange({ editor, html, text }) {
            this.post.text = html
        }
    },
    mounted() {
        new FroalaEditor('#froala', {
            toolbarButtons: {
                'moreText': {
                    'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
                },
                'moreParagraph': {
                    'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
                },
                'moreRich': {
                    'buttons': ['insertLink', 'insertImage', 'insertTable', 'emoticons', 'specialCharacters', 'embedly', 'insertHR']
                },
                'moreMisc': {
                    'buttons': ['undo', 'redo', 'fullscreen', 'print', 'spellChecker', 'selectAll', 'html', 'help']
                }
            },
            toolbarButtonsXS: [['undo', 'redo'], ['bold', 'italic', 'underline']],
            events: {
                "image.beforeUpload": function(files) {
                    var editor = this;
                    if (files.length) {
                        // Create a File Reader.
                        var reader = new FileReader();
                        // Set the reader to insert images when they are loaded.
                        reader.onload = function(e) {
                            var result = e.target.result;
                            editor.image.insert(result, null, null, editor.image.get());
                        };
                        // Read image as base64.
                        reader.readAsDataURL(files[0]);
                    }
                    editor.popups.hideAll();
                    // Stop default upload chain.
                    return false;
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 28px;
    margin-bottom: 40px;
}

h3 {
    width: 120px;
    margin: 30px 0 15px;
    text-align: right;
}

.switch-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
        display: block;
        margin-right: 10px;
    }
}

.quill-editor {
    background-color: #fff;
    height: 200px;
    max-height: 400px;
    overflow-y: auto;
}
</style>
