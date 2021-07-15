export default function (defaultDataValue = null) {
    return {
        data() {
            return {
                isLoading: true,
                data: defaultDataValue,
            }
        },
        async created() {
            //获取数据
            this.data = await this.fetchData();
            this.isLoading = false;
        },
    }
}