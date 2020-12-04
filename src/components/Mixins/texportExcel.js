export const exportExcel_second = {
    created() {},
    methods: {
        async getExcelData(cb, filtername, query, list) {
            let dataList = []
            let tHeader = [],
                filterVal = []
            list.forEach(item => {
                tHeader.push(item.label)
                filterVal.push(item.value)
            })
            let res = await cb(query)
            if (Array.isArray(res.data)) {
                if (res.data.length == 0) {
                    this.$message.error('暂无可导出的数据')
                    return false
                } else {
                    dataList.push(...res.data)
                }
            }

            if (res.data.rs && Array.isArray(res.data.rs)) {
                if (res.data.rs.length == 0) {
                    this.$message.error('暂无可导出的数据')
                    return false
                } else {
                    dataList.push(...res.data.rs)
                }
            }
            this.utils.exportExcel(dataList, tHeader, filterVal, filtername)
            this.isExpor = false
        }
    }
}