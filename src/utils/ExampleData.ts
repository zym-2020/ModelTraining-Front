export const step1 = {
    name: "聚类分析数据清洗",
    stepType: "数据预处理",
    operateType: "软件操作",
    other: "",
    reference: "",
    description: '对数据进行重新审查和校验的过程，目的在于删除重复信息、纠正存在的错误，并提供数据一致性。 数据清洗从名字上也看的出就是把"脏"的"洗掉"，指发现并纠正数据文件中可识别的错误的最后一道程序，包括检查数据一致性，处理无效值和缺失值等。',
    pictures: [],
    processResources: [
        {
            name: "人口数据",
            dataInfo: "2010-2020年中国各省人口数据",
            type: "data"
        },
        {
            name: "K-means聚类模型",
            type: "model",
            modelInfo: "k-means 算法是一种基于划分的聚类算法，它以 k 为参数，把 n 个数据对象分成 k 个簇，使簇内具有较高的相似度，而簇间的相似度较低。1基本思想. k-means算法是根据给定的 n 个数据对象的数据集，构建 k 个划分聚类的方法，每个划分聚类即为一个簇。该方法将数据划分为 n 个簇，每个簇至少有一个数据对象，每个数据对象必须属于而且只能属于一个簇。",
            modelInputs: [
                {
                    name: 'K值',
                    dataType: "paramter",
                    description: "簇数"
                },
                {
                    name: "x, y",
                    dataType: "parameter",
                    description: "初始中心点位置"
                },
                {
                    name: "样本",
                    dataType: "data",
                    description: "用于聚类的数据"
                }
            ],
            modelOutputs: []
        }
    ]
}