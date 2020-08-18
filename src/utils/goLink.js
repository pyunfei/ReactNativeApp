import NavigationService from '@/navigator/NavigationService';
import UrlParse from 'url-parse';
import { H5_PREFIX } from '@/config';
import { urlValid } from '@/lib/regex';
export default linkUrl => {
  // eslint-disable-next-line no-useless-escape
  if (urlValid(linkUrl)) {
    const { origin: appOrigin } = UrlParse(H5_PREFIX, true);
    const { query, pathname, origin: linkOrigin } = UrlParse(linkUrl, true);
    if (linkOrigin === appOrigin) {
      // 表示微信本地页面
      switch (pathname) {
        case '/tbdetail':
          NavigationService.navigate('productDetailHDK', {
            itemId: query.id,
          });
          return;
        case '/selfdetail':
          NavigationService.navigate('productDetailSelf', {
            itemId: query.id,
          });
          return;
        case '/bijiasearch':
          NavigationService.navigate('bijiaSearch');
          return;
        case '/vipdetail':
          NavigationService.navigate('productDetailVip', {
            itemId: query.id,
          });
          return;
        default:
          break;
      }
    }
    NavigationService.navigate('webview', {
      source: {
        uri: linkUrl,
      },
    });
  }
};
