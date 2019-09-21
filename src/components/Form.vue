<template>
    <div class="form">
        <div class="personal">
            <label class="personal__label" for="userName">Введите ваше имя: </label>
            <input id="userName" class="personal__input" type="text" v-model="userName" placeholder="Имя" />
        </div>
        <div class="message">
            <textarea class="message__textarea" v-model="message" placeholder="Введите текст сообщения"></textarea>
            <button class="message__button"
                    @click="persist(); $emit('updateStorage')"
                    :disabled="this.userName == '' || this.message == ''"
            >Отправить</button>
        </div>
    </div>
</template>

<script>
    import { getLocalStorage, getSessionStorage } from "../services";

    export default {
        name: 'Form',
        data() {
            return {
                userName: '',
                userId: null,
                message: '',
                stored: []
            }
        },
        mounted() {
            this.stored   = getLocalStorage('storage') || [];
            this.userName = getSessionStorage('userName') || '';

            if (!getSessionStorage('userId')) {
                this.userId = this.generateUserId();
                sessionStorage.setItem('userId', this.userId);
            } else {
                this.userId = getSessionStorage('userId');
            }
        },
        methods: {
            persist() {
                this.stored = getLocalStorage('storage') || [];
                this.stored.push({userId: this.userId, userName: this.userName, message: this.message});
                this.message = '';
                localStorage.setItem('storage', JSON.stringify(this.stored));
            },
            generateUserId() {
                return parseInt(Math.random() * 1000);
            }
        },
        watch: {
            userName: function(newName) {
                sessionStorage.setItem('userName', newName);
            }
        }
    }
</script>

<style lang="scss">
.form {
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    width: 50%;

    @to-width sm {
        order: 1;
        width: 100%;
    }
}

input, textarea {
    width: 20rem;
    max-width: 20rem;
    padding: .8rem 1rem;
    border: solid 1px #aaa;
    border-radius: .5rem;
    font-size: 1rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    @to-width sm {
        width: 18.5rem;
    }
}

.personal {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.5rem;
}

.personal__label {
    margin-bottom: .5rem;
}

.message {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    margin-top: 2rem;
}

.message__textarea {
    height: 100%;
}

.message__button {
    width: 100%;
    margin-top: 2rem;
    padding: 1rem;
    background: black;
    border: 0;
    border-radius: .5rem;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    outline: none;

    &:disabled {
        cursor: default;
        opacity: .5;
    }
}
</style>
