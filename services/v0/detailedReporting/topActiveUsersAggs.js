module.exports = (aggType, m, c) => {
    // need to grab month m arg as num 0-11 && currentDay? as c
    const month = 2;
    const currentDay = 5;
    const days = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
    
    let lastMonth;
    if (month - 1 < 0) lastMonth = 11;
    else lastMonth = month - 1;

    const aggMatch = {
        userAllTime: [
            {
                $group: {
                    "_id": "$email",
                    "displayName": { $first: "$displayName" },
                    "totalActivities": { $sum: 1 }
                }
            },
            { $sort: { "totalActivities": -1 } },
            { $limit: 5 }
        ],
        userThisWeek: [
            {
                $match: {
                    $expr: {
                        $gt: [
                            {
                                $toDate: "$_id"
                            },
                            {
                                $subtract: [ "$$NOW" , { $multiply: [86400000, 7 ] }]
                            }
                        ]
                    }
                }
            },
            {
                $group: {
                    "_id": "$email",
                    "displayName": { $first: "$displayName" },
                    "totalActivities": { $sum: 1 }
                }
            },
            { $sort: { "createdAt": -1 } },
            { $limit: 5 }
        ],
        userThisMonth: [
            {
                $match: {
                    $expr: {
                        $gt: [
                            {
                                $toDate: "$_id"
                            },
                            {
                                $subtract: [ "$$NOW" , { $multiply: [86400000, currentDay ] }]
                            }
                        ]
                    }
                }
            },
            {
                $group: {
                    "_id": "$email",
                    "displayName": { $first: "$displayName" },
                    "totalActivities": { $sum: 1 }
                }
            },
            { $sort: { "createdAt": -1 } },
            { $limit: 5 }
        ],
        userLastMonth: [
            {
                $match: {
                    $expr: {
                        $gt: [
                            {
                                $toDate: "$_id"
                            },
                            {
                                $subtract: [ "$$NOW" , { $multiply: [86400000, days[lastMonth] ] }]
                            }
                        ]
                    }
                }
            },
            {
                $group: {
                    "_id": "$email",
                    "displayName": { $first: "$displayName" },
                    "totalActivities": { $sum: 1 }
                }
            },
            { $sort: { "createdAt": -1 } },
            { $limit: 5 }
        ],
    }

    return aggMatch[aggType];
}
