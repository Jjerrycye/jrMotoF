<template>
    <div class="news_center_page">
        <div class="backgroundBox" :style="{ background: `url(${require('@/assets/ktmrc8.jpg')}) center` }">

            <h1>机车资讯</h1>
            <p>为您推荐最新的机车资讯，最新了解行业动态！</p>
            <div class="search">
                <el-popover placement="bottom" title="相关内容" :width="'50%'" :visible="visible">
                    <template #reference>
                        <el-input type="search" @blur="visible = false" @input="visible = true" v-model="searchText"
                            class="w-50 m-2" placeholder="Type something" :prefix-icon="Search" />
                    </template>
                    <div v-if="searchdata.length">
                        <div @click="newsDetail(keyword._id)" class="searchItem" v-for="keyword in searchdata"
                            :key="keyword._id">
                            {{ keyword.title }}
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="无结果" :image-size="50" />
                    </div>

                </el-popover>
            </div>

        </div>
        <!-- 最新资讯 -->
        <div class="topNews">
            <el-row :gutter="24">
                <el-col class="topNewsItem" :span="6" v-for="topNews in newList.slice(0, 4)" :key="topNews._id">
                    <el-card @click="newsDetail(topNews._id)" shadow="hover" :body-style="{ padding: '0px' }">
                        <div class="newsImage"
                            :style="{ background: `url(http://localhost:3000${topNews.cover})`, backgroundSize: '100% 100%' }">
                        </div>
                        <div style="padding: 14px">
                            <p class="title">{{ topNews.title }}</p>
                            <div class="bottom">
                                <time class="time">{{ formatDate.getTime(topNews.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!-- 资讯类别选项卡 -->
        <div class="newsMenu">
            <el-tabs v-model="activeName" class="demo-tabs" lazy>
                <el-tab-pane v-for="item in tabConfig" :key="item.name" :label="item.lable" :name="item.name" >
                    <el-row :gutter="24">
                        <el-col :span="18">
                            <el-card @click="newsDetail(tab._id)" v-for="tab in tabNews[item.name]" :key="tab._id">
                                <div class="flex">
                                    <div class="newsMenuImage"
                                        :style="{ background: `url(http://localhost:3000${tab.cover})`, backgroundSize: '100% 100%' }">
                                    </div>
                                    <div style="padding: 14px" class="newsMenuTitle">
                                        <p class="title">{{ tab.title }}</p>
                                        <div class="bottom">
                                            <time class="time">{{ formatDate.getTime(tab.editTime) }}</time>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-timeline class="timeline">
                                <el-timeline-item v-for="(activity) in tabNews[item.name]" :key="activity._id"
                                    :timestamp="formatDate.getTime(activity.editTime)">
                                    <p>{{ activity.title }}</p>
                                </el-timeline-item>
                            </el-timeline>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue"
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import formatDate from "@/utils/formatData"
import http from "@/utils/http"
import _ from "lodash"
const router = useRouter()
const searchText = ref("")
const visible = ref(false)
const newList = ref([])
const activeName = ref(1)
onMounted(() => {
    getNewslist()
})

//根据newList里的category来对数据进行分组
//引用lodash库里的groupBy(要进行分组的数据,回调(要以数据中的哪一项来分组))
const tabNews = computed(() => _.groupBy(newList.value.slice(4), item => item.category))
//搜索过滤数据
const searchdata = computed(() => searchText.value ? newList.value.filter(item => {
    return item.title.includes(searchText.value)
}) : [])

const getNewslist = async () => {
    const res = await http.get("/webapi/news/newslist")
    newList.value = res.data.data
}

const newsDetail = (id) => {
    router.push(`/newsdetail/${id}`)
}

//选项卡配置
const tabConfig = [
    { lable: "最新动态", name: 1 },
    { lable: "典型案例", name: 2 },
    { lable: "通知公告", name: 3 },
]

</script>

<style lang="scss" scoped>

.backgroundBox {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 450px;
    text-align: center;
    width: 100%;
    background-color: blanchedalmond;

    h1 {
        color: white;
    }

    p {
        color: #ffffff;
        font-size: 20px;
    }

    .search {
        margin: 0 auto;
        width: 100%;

        .el-input {
            width: 50%
        }

    }

}

.searchItem {
    height: 50px;
    line-height: 50px;

    &:hover {
        color: rgb(204, 82, 82);
        background-color: #ece8e8;
        cursor: pointer;
    }
}

.topNews {
    padding: 0 100px 0 100px;
    margin: 20px;
    .el-row {
        margin: 0;
    }

    .topNewsItem {
        cursor: pointer;

        .newsImage {
            height: 200px;
            transition: all 0.5s;
        }

        .newsImage:hover {
            transform: scale(1.1);
        }

        .title {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; // 默认不换行；

        }

        .bottom {
            margin-top: 10px;
            font-size: 12px;
            color: #a1a1a1;
        }

    }

}

.newsMenu {
    box-sizing: border-box;
    max-width: 100vw;
    cursor: pointer;
    padding: 0 100px 0 100px;
    .timeline p {
        font-size: 6px;
    }

    .flex {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: row;
        // justify-content: space-;

    }

    .el-card {
        margin-bottom: 5px;

    }

    .el-card:hover {
        .newsMenuImage {
            transform: scale(1.1);
        }
    }

    .newsMenuImage {
        height: 100%;
        width: 150px;
        transition: all 0.5s;
    }



    .newsMenuTitle {
        width: 100%;

        .time {
            font-size: 12px;
            color: #a1a1a1;
        }
    }

    .el-tabs {
        padding: 0 15px 0 15px;
    }


}
</style>