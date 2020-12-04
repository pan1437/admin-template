// 分润导出表格
export const exportExcel = {
    created() {},
    methods: {
        async getExcel(cb, filtername, type) {
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

                let datas = Object.assign({},
                        dataPage,
                        this.clear(this.filterInfo.query)
                    )
                    // this.$message("正在导出第" + (i + 1) + "页的数据");
                let res = ''

                if (type) {
                    res = await cb(type, datas)
                } else {
                    res = await cb(datas)
                }

                const tableData = res.data.rs || []
                if (type && type == 3) {
                    for (let index = 0; index < tableData.length; index++) {
                        const element = tableData[index]

                        element.recommend = this._formartCell(
                            'recommend',
                            element.recommend
                        )
                        element.permanent = this._formartCell(
                            'permanent',
                            element.permanent
                        )
                        console.log(element.service)
                        element.service = this._formartCell('service', element.service)
                    }
                }

                dataList.push(...res.data.rs)
                if (res.data.total <= 1000) {
                    this.utils.exportExcel(dataList, tHeader, filterVal, filtername)
                    this.isExpor = false
                    return false
                }
            }

            this.utils.exportExcel(dataList, tHeader, filterVal, filtername)
            this.isExpor = false
        },
        _formartCell(type, itemArr) {
            let cell = ''

            if (type == 'recommend') {
                if (itemArr) {
                    itemArr.forEach(item => {
                        cell += `${item.recommend_name} ${item.recommend_level_name} ${
              item.recommend_profit
            }，`
                    })
                }
            } else if (type == 'permanent') {
                if (itemArr) {
                    itemArr.forEach(item => {
                        cell += `${item.permanent_user_name} ${item.permanent_level_name} ${
              item.permanent_profit
            }，`
                    })
                }
            } else if (type == 'service') {
                if (itemArr) {
                    itemArr.forEach(item => {
                        cell += `${item.service_name} ${item.service_level_name} ${
              item.service_profit
            }，`
                    })
                }
            }
            return cell
        }
    }
}