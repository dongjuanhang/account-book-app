const List = () => import('@/views/transactions/list');
const Edite = () => import('@/views/transactions/edite');
export default [
    {
        name: 'transactionsList',
        path: '/transactions',
        component: List,
    },
    {
        name: 'transactionsEdite',
        path: '/transactions/edite',
        component: Edite,
    },
];
