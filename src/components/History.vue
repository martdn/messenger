<template>
    <div class="history" id="history">
        <ul class="history__list">
            <p v-if="!this.storage">⚠️ На данный момент нет ни одного сообщения.</p>
            <li class="history__message"
                v-for="item in this.storage"
                :class="{'history__message_user_current': item.userId == userId}"
                :key="item.id"
            >
                <div class="history__message-name"><b v-if="item.userId == userId">Вы:&nbsp;</b>{{ item.userName }}</div>
                <div class="history__message-text">{{ item.message }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { getSessionStorage } from "../services";

    export default {
        name: 'History',
        props: ['storage'],
        data() {
          return {
              userId: null
          }
        },
        mounted() {
            this.userId = getSessionStorage('userId');
        },
        updated() {
            document.getElementById("history").scrollTop = document.getElementById("history").scrollHeight;
        }
    }
</script>

<style lang="scss">
    .history {
        width: 50%;
        padding: 1.5rem 4rem;
        background: #fafafa;
        border-radius: 1rem;
        font-size: .8rem;
        overflow-y: scroll;

        @to-width sm {
            width: 16.5rem;
            height: 30rem;
            margin-bottom: 2rem;
            padding: 1rem 2rem;
        }
    }

    .history__list {
        display: flex;
        flex-flow: column nowrap;
        padding: 0;
        text-align: center;
    }

    .history__message {
        width: 80%;
        margin: .7rem 0;
        padding: .8rem 1.6rem;
        background: none;
        border: solid 1px #aaa;
        border-radius: 1rem;
        text-align: left;
        list-style-type: none;
    }

    .history__message-name {
        font-weight: bold;
    }

    .history__message_user_current {
        text-align: right;
        background: #237afb;
        color: white;
        border: 0;
        align-self: flex-end;
    }
</style>
