export const baseInit=(parms={title:'店长直聘',pk:'unknown'})=> {
    return target=>{
        //埋点
        try {
            Common.statistics.sendPage(parms.pk)
        } catch (e) {

        }
        //设置标题
        document.title=parms.title
    }
}