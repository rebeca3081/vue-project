<template>
    <div class="container">
        <div class="row">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center table-primary">번호</th>
                        <td scope="col" class="text-center">{{ boardInfo.no }}</td>
                        <th scope="col" class="text-center table-primary">작성일</th>
                        <td scope="col" class="text-center">{{ getDateFormat(boardInfo.created_date) }}</td>
                        <th scope="col" class="text-center table-primary">이름</th>
                        <td scope="col" class="text-center">{{ boardInfo.writer }}</td>
                    </tr>

                    <tr>
                        <th colspan="2" class="text-center table-primary">제목</th>
                        <td colspan="4">{{ boardInfo.title }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" class="text-left" valign="top" height="200">
                            <pre
                                style="white-space: pre-wrap;border:none;background-color: white;">{{ boardInfo.content }}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-center">
                            <button class="btn btn-xs btn-info"
                                        @click="goToUpdateForm(boardInfo.no)">수정</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="row">
            <!-- 해당 게시글이 댓글이 있다면 -->
            <CommentList v-if="boardInfo.comment > 0"
                        v-bind:bno="boardInfo.no" />
            <!-- 해당 게시글이 댓글이 존재하지 않는 다면 -->
            <div v-else class="cart text-center">
                댓글 없음
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import CommentList from '../components/CommentList.vue';

export default {
    data() {
        return {
            boardInfo: {
                no : null,
                title : '',
                writer : '',
                content : '',
                created_date : null,
                updated_date : null
            }
        };
    },
    components : { // 부모 컴포넌트에게 자식컴포넌트 import 및 옵션으로 등록
        CommentList
    },
    created() { // 비동기 mounted, watcher는 자식 먼저 랜더링, 부모 먼저 랜더링
        let searchNo = this.$route.query.boardNo;
        this.getBoardInfo(searchNo);
    },
    methods: {
        async getBoardInfo(no) {
             let result = await axios.get("/api/boards/" + no)
                                .catch(err => console.log(err));
             this.boardInfo = result.data;      
        },
        getDateFormat(date) {
            let dateValue = date == null ? new Date() : new Date(date);
            let year = dateValue.getFullYear();
            let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
            let day = ('0' + dateValue.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        goToUpdateForm(no) {
          this.$router.push({ path : '/boardForm', query : {'boardNo': no}});
        }
    }
}
</script>
