export default interface IRoute {
  icon: any;
  path: string;
  breadcrumbName: string;
  siderKey: string;
  children?: IRoute[];
}
