// 适用产品规格,

const productType = {
    "1-1": { value: "1-1", key: `item-1-1`, title: "秒聘银卡" },
    "1-2": { value: "1-2", key: `item-1-2`, title: "秒聘金卡" },
    "1-3": { value: "1-3", key: `item-1-3`, title: "秒聘钻石" },

    "2-1": { value: "2-1", key: `item-2-1`, title: "白银会员一个月" },
    "2-2": { value: "2-2", key: `item-2-2`, title: "白银会员三个月" },
    "2-3": { value: "2-3", key: `item-2-3`, title: "白银会员六个月" },
    "2-4": { value: "2-4", key: `item-2-4`, title: "黄金会员一个月" },
    "2-5": { value: "2-5", key: `item-2-5`, title: "黄金会员三个月" },
    "2-6": { value: "2-6", key: `item-2-6`, title: "黄金会员六个月" },
    "2-7": { value: "2-7", key: `item-2-7`, title: "钻石会员一个月" },
    "2-8": { value: "2-8", key: `item-2-8`, title: "钻石会员三个月" },
    "2-9": { value: "2-9", key: `item-2-9`, title: "钻石会员六个月" },

    "3-1": { value: "3-1", key: `item-3-1`, title: "畅聊10次卡" },
    "3-2": { value: "3-2", key: `item-3-2`, title: "畅聊日卡" },
    "3-3": { value: "3-3", key: `item-3-3`, title: "无限周卡" },
    "3-4": { value: "3-4", key: `item-3-4`, title: "无限月卡" },
    "3-5": { value: "3-5", key: `item-3-5`, title: "畅聊周卡" },
    "3-6": { value: "3-6", key: `item-3-6`, title: "畅聊月卡" },

    "4-1": { value: "4-1", key: `item-4-1`, title: "单个" },
    "4-2": { value: "4-2", key: `item-4-2`, title: "黄金版" },
    "4-3": { value: "4-3", key: `item-4-3`, title: "铂金版" },
    "4-4": { value: "4-4", key: `item-4-4`, title: "钻石版" },

    "5-1": { value: "5-1", key: `item-5-1`, title: "单个" },
    "5-2": { value: "5-2", key: `item-5-2`, title: "白银版" },
    "5-3": { value: "5-3", key: `item-5-3`, title: "黄金版" },
    "5-4": { value: "5-4", key: `item-5-4`, title: "钻石版" },

    // "6-1": { value: "6-1", key: `item-6-1`, title: "过期解锁卡" },
};

export const productTypeTree = [
    {
        selectable: false,
        title: "秒聘",
        value: "1",
        key: `item-1`,
        children: [productType["1-1"], productType["1-2"], productType["1-3"]],
    },
    {
        selectable: false,
        title: "会员",
        value: "2",
        key: `item-2`,
        children: [
            productType["2-1"],
            productType["2-2"],
            productType["2-3"],
            productType["2-4"],
            productType["2-5"],
            productType["2-6"],
            productType["2-7"],
            productType["2-8"],
            productType["2-9"],
        ],
    },
    {
        selectable: false,
        title: "畅聊",
        value: "3",
        key: `item-3`,
        children: [
            productType["3-1"],
            productType["3-2"],
            productType["3-3"],
            productType["3-4"],
            productType["3-5"],
            productType["3-6"],
        ],
    },
    {
        selectable: false,
        title: "极速拨打电话卡",
        value: "4",
        key: `item-4`,
        children: [productType["4-1"], productType["4-2"], productType["4-3"], productType["4-4"]],
    },
    {
        selectable: false,
        title: "刷新卡",
        value: "5",
        key: `item-5`,
        children: [productType["5-1"], productType["5-2"], productType["5-3"], productType["5-4"]],
    },
    // {
    //     selectable: false,
    //     title: "过期解锁卡",
    //     value: "6",
    //     key: `item-6`,
    //     children: [
    //         productType["6-1"],
    //     ]
    // }
];

export default productType;
