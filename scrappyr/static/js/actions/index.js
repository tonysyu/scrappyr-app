export function receiveScraps(scraps) {
    return {
        type: 'RECEIVE_SCRAPS',
        scraps: scraps,
    };
}

const actionCreators = [
    receiveScraps,
];

export default actionCreators;
