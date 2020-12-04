<template>
  <div class="page-table" :class="className">
    <!-- 显示表格 -->
    <el-table
      ref="table"
      v-loading="pageParm.loading"
      :max-height="pageParm.tableHeight || undefined"
      :data="data"
      @row-click="handleRowClick"
      :default-expand-all="true"
      :row-key="keys"
      :tree-props="{ children: 'subcategory', hasChildren: 'hasChildren' }"
      border
      style="width:100%"
      @select-all="handleSelectionChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="checkBox"
        :key="'selection'"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="tabIndex"
        :key="'index'"
        align="center"
        label="序号"
        :width="fieldList.length === 0 ? '' : 80"
        fixed
      >
        <template v-slot="scope">
          <span v-if="pager">
            {{
              scope.$index +
                1 +
                (pageParm.query.page - 1) * pageParm.query.per_page
            }}
          </span>
          <span v-else>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in fieldList.filter(item => !item.hidden)"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :fixed="item.fixed"
        :align="item.align || 'center'"
        :formatter="item.formatter"
        :width="item.width"
        :min-width="item.minWidth || '100px'"
        :sortable="item.sortable"
      >
        <template v-slot="scope">
          <!-- solt 自定义列-->
          <template v-if="item.type === 'slot'">
            <slot :name="'col-' + item.value" :row="scope.row" />
          </template>
          <!-- 嵌套表格 -->
          <template v-else-if="item.children">
            <el-table-column
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
              :prop="childItem.value"
              :label="childItem.label"
              :align="item.align || 'center'"
              :width="item.width"
              :min-width="item.minWidth || '85px'"
            />
          </template>
          <!-- 标签 -->
          <el-tag v-else-if="item.type === 'tag'">{{
            scope.row[item.value]
          }}</el-tag>
          <!-- 图片    v-imgAlart -->
          <img
            v-else-if="item.type === 'image' && scope.row[item.value]"
            height="50px"
            :src="getUrl(scope.row[item.value])"
          />
          <!-- 其他 -->
          <span v-else>{{
            getDataName({
              dataList: listTypeInfo[item.list],
              value: 'value',
              label: 'key',
              data: scope.row[item.value]
            }) || '-'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="handle"
        :key="'handle'"
        :fixed="handle.fixed"
        align="center"
        :label="handle.label"
        :width="handle.width"
      >
        <template v-slot="scope">
          <el-button-group>
            <template v-for="(item, index) in handle.btList">
              <!-- 自定义操作类型 -->
              <slot
                v-if="item.slot"
                :name="'bt-' + item.event"
                :data="{ item, row: scope.row }"
              />
              <!-- 操作按钮 -->
              <el-button
                style="margin:0 5px"
                v-if="
                  !item.slot &&
                    item.show &&
                    (!item.ifRender || item.ifRender(scope.row))
                "
                :key="index"
                v-waves
                size="mini"
                :type="item.type"
                :icon="item.icon"
                :disabled="item.disabled"
                :loading="scope.row[item.loading]"
                @click="handleClick(item.event, scope.row)"
                >{{ item.label }}</el-button
              >
            </template>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <template v-if="pager">
      <div v-show="!pageParm.loading" class="pagination-container">
        <el-pagination
          background
          :current-page.sync="pageParm.query.page"
          :page-sizes="pageParm.pagesizes"
          :page-size="pageParm.query.per_page"
          layout="total, sizes, prev, pager, next, jumper,slot"
          :total="pageParm.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <el-button
            type="primary"
            size="small"
            class="pagination_btn"
            @click="handleCurrentChange(pageParm.query.page)"
            >确定</el-button
          >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getDictionary } from '@/utils/auth'
export default {
  name: 'PageTable',
  props: {
    // 自定义类名
    className: {
      type: String
    },
    keys: {
      type: String,
      default: 'id'
    },
    // 刷新
    refresh: {
      type: Number
    },
    imgUrl: {
      type: String,
      default: ''
    },
    // 获取数据的接口
    api: {
      type: Function
    },
    // 是否显示序号
    tabIndex: {
      type: Boolean,
      default: true
    },
    // 是否有选择框
    checkBox: {
      type: Boolean,
      default: false
    },
    // 选中列表
    checkedList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 类型列表
    listTypeInfo: {
      type: Object
    },
    // 表格字段配置
    fieldList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 操作栏配置
    handle: {
      type: Object
    },
    // 是否分页
    pager: {
      type: Boolean,
      default: true
    },
    // 分页参数
    pageParm: {
      type: Object,
      default: () => {
        return {
          tableHeight: 0, // 表格最大高度
          total: 0, // 总条数
          loading: true, // 加载动画
          // pagesizes: [5, 10, 20, 50, 100], // 分页数量列表
          query: {
            // 查询条件
            page: 1, // 当前页
            per_page: 10 // 每页条数
          }
        }
      }
    },
    // 重置当前页
    initCurpage: {
      type: Number
    },
    // 查询条件
    query: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 列表数据
    data: {
      type: Array
    },
    // 监听高度
    listenHeight: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 列表相关
      // pageParm: {
      //     tableHeight: 0, // 表格最大高度
      //     total: 0, // 总条数
      //     loading: false, // 加载动画
      //     pagesizes: [5, 10, 20, 50, 100], // 分页数量列表
      //     query: {
      //         // 查询条件
      //         curPage: 1, // 当前页
      //         per_page: 10 // 每页条数
      //     }
      // }
      img_site: ''
    }
  },
  created() {
    // this.getList(this.api)
    // this.getCommon();
  },
  computed: {
    // ...mapGetters(['fullScreen'])
  },
  watch: {
    initCurpage() {
      // this.pageParm.query.page = 1
    },
    refresh() {
      // if (!this.api) return
      // this.getList(this.api)
    },
    fullScreen() {
      if (this.listenHeight) {
        // 得到表格的高度
        this.pageParm.tableHeight = this.getTableHeight()
      }
    }
  },
  mounted() {
    if (this.listenHeight) {
      // 得到表格的高度
      this.pageParm.tableHeight = this.getTableHeight()
      // 监听页面大小改变
      window.addEventListener('resize', () => {
        // 得到表格的高度
        this.pageParm.tableHeight = this.getTableHeight()
      })
    }
  },

  methods: {
    getUrl(url) {
      this.img_site = getDictionary().img_site
      if (url.indexOf('http://') != -1 || url.indexOf('https://') != -1) {
        return url
      } else {
        return this.img_site + url
      }
    },
    getDataName: obj => {
      let name = obj.data
      if (Array.isArray(obj.dataList) && obj.dataList.length > 0) {
        for (let i = 0; i < obj.dataList.length; i++) {
          if (obj.dataList[i][obj.value] === obj.data) {
            name = obj.dataList[i][obj.label]
          }
        }
      }
      return name
    },
    // 处理参数
    handleParams() {
      const obj = {}
      for (const key in this.query) {
        if (this.query[key] || this.query[key] === 0) {
          obj[key] = this.query[key]
        }
      }
      // 如果不需要分页，则无分页相关参数
      return this.pager ? { ...this.pageParm.query, ...obj } : obj
    },
    // 得到数据
    getList(api) {
      this.pageParm.loading = true
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        // 每次调用接口时都自动绑定最新的数据
        api(this.handleParams()).then(res => {
          this.pageParm.loading = false
          if (res.code == 1000) {
            // 使外面可以访问到表格数据
            const arr = Array.isArray(res.data.data)
              ? res.data.data
              : res.data.result
            this.$emit('update:data', arr)
            if (this.pager) {
              this.pageParm.total = res.data.total - 0
              this.pageParm.query.page = res.data.page - 0
              this.pageParm.query.per_page = res.data.per_page - 0
            }
            // 设置当前选中项
            // this.checkedList.forEach(selected => {
            //     const row = arr.find(item => {
            //         return item.id === selected
            //     })
            //     this.$nextTick(() => {
            //         if (!row) return
            //         this.$refs.table.toggleRowSelection(
            //             row,
            //             true
            //         )
            //     })
            // })
            resolve(res)
            this.$emit('handleEvent', 'list', arr)
          }
        })
      })
    },
    handleSizeChange(val) {
      // pageSize 改变时会触发	每页条数
      this.$emit('handleEvent', 'pageSize', val)
      // const query = this.pageParm.query
      // query.per_page = val // 每页条数
      // query.curPage = 1 // 每页条数切换，重置当前页
      // this.getList(this.api)
    },
    handleCurrentChange(val) {
      this.$emit('handleEvent', 'curPage', val)
      // currentPage 改变时会触发 当前页
      // this.pageParm.query.curPage = val // 当前页
      // this.getList(this.api)
    },
    // 派发按钮点击事件
    handleClick(event, data, childItem) {
      this.$emit('handleClick', event, data, childItem)
    },
    // clickEnter(){
    //         this.handleRowClick()
    // },
    handleRowClick(rows) {
      this.$emit('handleEvent', 'rowClick', rows)
    },
    // 选中数据
    handleSelectionChange(rows) {
      this.$emit('handleEvent', 'tableCheck', rows)
    },
    // 根据页面的头部, 功能框, 分页组件等高度，计算出table的高度
    getTableHeight() {
      // 当表格存在的时候才执行操作
      if (document.getElementsByClassName('el-table').length === 0) {
        return
      }
      const boxH = document.body.clientHeight
      const navH = document.getElementsByClassName('navbar-container')[0]
        ? document.getElementsByClassName('navbar-container')[0].clientHeight
        : 0
      const tagH = document.getElementsByClassName('tags-view-container')[0]
        ? document.getElementsByClassName('tags-view-container')[0].clientHeight
        : 0
      const searchH = document.getElementsByClassName('page-filter')[0]
        ? document.getElementsByClassName('page-filter')[0].clientHeight
        : 0
      const pagerH = document.getElementsByClassName(
        'pagination-container'
      )[0] || { clientHeight: 0 }
      const bottomH = pagerH.clientHeight
        ? pagerH.clientHeight + 40
        : pagerH.clientHeight - 35
      const tab = document.getElementsByClassName('el-table')[0] || {
        offsetTop: 0
      }
      const tabOffT = tab.offsetTop
      // 表格的高度 = 视口高度 - 表格到头部导航的距离 - 头部导航的高度137 - 分页组件的高度100 - 分页组件
      document.getElementsByClassName('el-table')[0].style.height =
        boxH - tabOffT - navH - tagH - searchH - bottomH + 'px'
      // console.log('表格最大高度为:' + (boxH - navH - tagH - searchH - bottomH))
      return boxH - navH - tagH - searchH - bottomH
    }
  }
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
// 自定义表格相关
.page-table {
  .pagination-container {
    padding: 15px 0;
  }
  .pagination_btn {
    background-color: #409eff !important;
    border-color: #409eff !important;
    margin-left: 20px;
  }
  .el-pagination button:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
    outline: 0;
  }
  .el-button--primary:active {
    outline: 0;
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .el-pagination button:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}
</style>
