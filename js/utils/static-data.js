//状态: 0:未审核; 1:审核通过; 2:驳回
export const withdrawStatus = {
    0: "未审核",
    2: "驳回",
    1: "审核通过",
}

export const getType = (action, obj) => {
    switch (action){
        case action:
            return obj[action]
    }
    return obj;
}
