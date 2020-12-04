import { getDictionary } from '@/utils/auth'
export const exportExcel = {
    created() {},
    methods: {
        async getExcel(url, filtername, query, type) {
            this.commonsDate = getDictionary()
            console.log(type)
            if (this.pageParm.total == 0) {
                this.$message('暂无可导出的数据')
                return false
            }
            let dataList = []
                //导出
            let tHeader = [],
                filterVal = []
            this.tableInfo.fieldList.forEach(item => {
                tHeader.push(item.label)
                filterVal.push(item.value)
            })
            for (let i = 0; i <= this.pageParm.total / 1000; i++) {
                let dataPage = {
                    page: i + 1,
                    per_page: this.pageParm.total < 1000 ? this.pageParm.total : 1000
                }

                console.log(this.filterInfo.query)
                let datas = Object.assign({},
                        query,
                        dataPage,
                        this.clear(this.filterInfo.query)
                    )
                    // this.$message("正在导出第" + (i + 1) + "页的数据");

                let res = await url(datas)
                console.log(type)
                if (type == 1) {
                    res.data.rs.forEach(item => {
                        this.commonsDate.city_level.forEach(element => {
                            if (element.key == item.city_level) {
                                item.city_level = element.value
                            }
                        })
                        this.commonsDate.district.forEach(element => {
                            if (element.key == item.region) {
                                item.region = element.value
                            }
                        })
                        if (item.audit != undefined) {
                            switch (item.audit) {
                                case 0:
                                    item.audit = '待财务审核'
                                    break
                                case -1:
                                    item.audit = '审核失败'
                                    break
                                case 1:
                                    item.audit = '待管理员审核'
                                    break
                                case 2:
                                    item.audit = '审核通过'
                                    break
                                case -2:
                                    item.audit = '审核失败'
                                    break
                            }
                        }
                    })
                    console.log(res.data.rs)
                    dataList.push(...res.data.rs)
                } else {
                    res.data.rs.forEach(item => {
                        if (item.audit != undefined) {
                            switch (item.audit) {
                                case 0:
                                    item.audit = '待财务审核'
                                    break
                                case -1:
                                    item.audit = '审核失败'
                                    break
                                case 1:
                                    item.audit = '待管理员审核'
                                    break
                                case 2:
                                    item.audit = '审核通过'
                                    break
                                case -2:
                                    item.audit = '审核失败'
                                    break
                            }
                        }
                    })
                    dataList.push(...res.data.rs)
                }

                if (res.data.total <= 1000) {
                    this.utils.exportExcel(dataList, tHeader, filterVal, filtername)
                    this.isExpor = false
                    return false
                }
            }

            this.isExpor = false
        }
    }
}