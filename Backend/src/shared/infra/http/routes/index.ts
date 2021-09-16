import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import productsRoutes from '@modules/products/infra/http/routes/products.routes';
import salesOrderRoutes from '@modules/sales_order/infra/http/routes/salesOrder.routes';
import paymentsRoutes from '@modules/payments/infra/http/routes/payments.routes';
import walletsRoutes from '@modules/wallet/infra/http/routes/wallet.routes';
import financialRoutes from '@modules/financial/infra/http/routes/financial.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/order-sales', salesOrderRoutes);
router.use('/payments', paymentsRoutes);
router.use('/wallets', walletsRoutes);
router.use('/financial', financialRoutes);

export default router;