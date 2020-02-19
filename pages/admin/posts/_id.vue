<template>
    <div>
        <h1>Редактировать пост</h1>
        
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
                    :file-list="fileList"
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
            <h4>Мета-данные</h4>
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
                <el-button :loading="loading" type="danger" @click="onDelete">Удалить</el-button>
                <el-button :loading="loading" type="primary" @click="onSubmit">Сохранить</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    validate ({params}) {
        return !!params.id
    },
    data() {
        return {
            text: '',
            image: null,
            loading: false,
            showEditor: true,
            editor: null,
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
    async asyncData({store, params}) {
        const post = await store.dispatch('post/fetchById', params.id)
        const categories = await store.dispatch('category/fetch')
        const fileList = [{name: post.imageUrl, url: `http://localhost:3000/uploads/${post.imageUrl}`}]
        post.categories = post.categories.map(category => {
                            let currentCategory = categories.find(item => category === item._id)
                            return currentCategory.title
                        })

        return {post, categories, fileList}
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
            this.image = file.raw
            this.fileList = fileList.slice(1)
        },
        onSubmit() {
            console.log('asd')
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    let text = document.querySelector('#froala .fr-view').innerHTML

                    try {
                        let formData = {
                            id: this.post._id,
                            title: this.post.title,
                            slug: this.post.slug,
                            order: this.post.order,
                            text: text,
                            description: this.post.description,
                            metaTitle: this.post.metaTitle,
                            metaDescription: this.post.metaDescription,
                            keywords: this.post.keywords,
                            image: this.image
                        }
                        if (this.post.categories.length > 0) {
                            formData.categories = this.post.categories.map(category => {
                                let currentCategory = this.categories.find(item => category === item.title)
                                return currentCategory._id
                            })
                        } else {
                            formData.categories = []
                        }
                        await this.$store.dispatch('post/update', formData)
                            .then(post => {
                                this.$message.success('Изменения сохранены!')
                            })
                    } catch (e) {} finally {
                        this.loading = false
                    }
                } else {
                    this.$message.warning('Форма не валидна')
                }
            })
        },
        async onDelete() {
            try {
                await this.$confirm(`Вы действительно хитите удалить пост "${this.post.title}"?`, {type: 'warning'})
                await this.$store.dispatch('post/remove', this.post._id)
                    .then(() => {
                        this.$message.success('Пост удален!')
                        this.$router.push('/admin/posts')
                    })
            } catch (e) {}
        },
        onEditorChange({ editor, html, text }) {
            this.post.text = html
        }
    },
    mounted() {
        let postText = this.post.text
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
                'initialized': function () {
                    this.html.set(postText)
                },
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