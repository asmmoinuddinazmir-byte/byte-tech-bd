import type { Order } from '@/lib/types';

interface SSLCommerzConfig {
  storeId?: string;
  storePassword?: string;
  isSandbox?: boolean;
}

export function getSSLCommerzConfig(): SSLCommerzConfig {
  return {
    storeId: process.env.SSLCOMMERZ_STORE_ID,
    storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD,
    isSandbox: process.env.SSLCOMMERZ_IS_SANDBOX !== 'false',
  };
}

export async function initiateSSLCommerzPayment(order: Order, siteUrl: string) {
  const config = getSSLCommerzConfig();

  if (!config.storeId || !config.storePassword) {
    throw new Error(
      'SSLCommerz gateway credentials not configured. Please define SSLCOMMERZ_STORE_ID and SSLCOMMERZ_STORE_PASSWORD in your environment variables.'
    );
  }

  const endpoint = config.isSandbox
    ? 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php'
    : 'https://securepay.sslcommerz.com/gwprocess/v4/api.php';

  const formData = new URLSearchParams();
  formData.append('store_id', config.storeId);
  formData.append('store_passwd', config.storePassword);
  formData.append('total_amount', order.total.toString());
  formData.append('currency', 'BDT');
  formData.append('tran_id', order.order_number);
  formData.append('success_url', `${siteUrl}/api/payment/sslcommerz/success`);
  formData.append('fail_url', `${siteUrl}/api/payment/sslcommerz/fail`);
  formData.append('cancel_url', `${siteUrl}/api/payment/sslcommerz/cancel`);
  formData.append('ipn_url', `${siteUrl}/api/payment/sslcommerz/ipn`);

  // Customer info
  formData.append('cus_name', order.customer_name);
  formData.append('cus_email', order.customer_email || 'customer@bytetechbd.com');
  formData.append('cus_add1', order.shipping_address);
  formData.append('cus_city', order.shipping_city);
  formData.append('cus_country', 'Bangladesh');
  formData.append('cus_phone', order.customer_phone);

  // Shipping info
  formData.append('shipping_method', 'COURIER');
  formData.append('ship_name', order.customer_name);
  formData.append('ship_add1', order.shipping_address);
  formData.append('ship_city', order.shipping_city);
  formData.append('ship_country', 'Bangladesh');

  // Product info
  formData.append('product_name', 'Computer Hardware and Accessories');
  formData.append('product_category', 'Electronics');
  formData.append('product_profile', 'physical-goods');

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();

  if (data.status === 'SUCCESS' && data.GatewayPageURL) {
    return {
      success: true,
      redirectUrl: data.GatewayPageURL,
      sessionkey: data.sessionkey,
    };
  }

  throw new Error(data.failedreason || 'Failed to initiate payment with SSLCommerz gateway');
}

export async function validateSSLCommerzIPN(valId: string) {
  const config = getSSLCommerzConfig();

  if (!config.storeId || !config.storePassword) {
    throw new Error('SSLCommerz gateway credentials not configured.');
  }

  const endpoint = config.isSandbox
    ? `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${config.storeId}&store_passwd=${config.storePassword}&format=json`
    : `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${config.storeId}&store_passwd=${config.storePassword}&format=json`;

  const response = await fetch(endpoint);
  return await response.json();
}
