interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Administrator'],
  customerRoles: [],
  tenantRoles: ['System Administrator', 'Knowledge Manager'],
  tenantName: 'Organization',
  applicationName: 'contra revenue',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage organizations',
    'Invite Knowledge Managers',
    'Monitor usage of search tool and knowledge base',
    'Manage permissions of Knowledge Managers',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/b8155fc2-6c74-4c52-afdb-e8a8e1cb1557',
};
