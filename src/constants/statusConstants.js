const STATUS = {
    PREPARE: 1,
    IN_PROGRESS: 2,
    TEST: 3,
    FINISH: 4,
    CLOSE: 5,
    PAUSE: 6,
    NOT_DO: 7,
};

module.exports = {
    STATUS,
    STATUS_TASK_WF: {
        [STATUS.PREPARE]: {
            name: STATUS.PREPARE,
            next: [STATUS.IN_PROGRESS],
        },
        [STATUS.IN_PROGRESS]: {
            name: STATUS.IN_PROGRESS,
            next: [STATUS.TEST, STATUS.FINISH, STATUS.PAUSE, STATUS.NOT_DO],
        },
        [STATUS.TEST]: {
                name: STATUS.TEST,
                next: [STATUS.FINISH, STATUS.PAUSE, STATUS.NOT_DO],
        },
        [STATUS.FINISH]: {
            name: STATUS.FINISH,
            next: [STATUS.CLOSE,STATUS.TEST],
        },
        [STATUS.CLOSE]: {
            name: STATUS.CLOSE,
            next: [],
        },
        [STATUS.PAUSE]: {
            name: STATUS.PAUSE,
            next: [STATUS.IN_PROGRESS],
        },
        [STATUS.NOT_DO]: {
            name: STATUS.NOT_DO,
            next: [STATUS.IN_PROGRESS],
        },
    },
};