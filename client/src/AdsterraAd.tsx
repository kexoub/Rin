// AdsterraAd.tsx
import { useEffect } from 'react';

interface AdsterraAdProps {
  adKey: string;
  width?: number;
  height?: number;
}

export function AdsterraAd({ adKey, width = 468, height = 60 }: AdsterraAdProps) {
  useEffect(() => {
    // 检查是否已加载过相同的广告
    if (document.querySelector(`script[src*="${adKey}"]`)) {
      return;
    }

    // 创建配置脚本
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      atOptions = {
        'key': '${adKey}',
        'format': 'iframe',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `;
    
    // 创建加载脚本
    const loadScript = document.createElement('script');
    loadScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    loadScript.async = true;

    // 添加到body
    document.body.appendChild(configScript);
    document.body.appendChild(loadScript);

    // 清理函数
    return () => {
      if (document.body.contains(configScript)) {
        document.body.removeChild(configScript);
      }
      if (document.body.contains(loadScript)) {
        document.body.removeChild(loadScript);
      }
    };
  }, [adKey, width, height]);

  return (
    <div style={{ margin: '20px auto', textAlign: 'center' }}>
      {/* 广告将动态插入到这里 */}
    </div>
  );
}
