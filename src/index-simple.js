// 간단한 라우팅이 있는 Splunk Dashboard
const dashboardHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FortiManager Security Operations Dashboard - Splunk Demo</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
            color: #fff;
            min-height: 100vh;
        }
        .nav-buttons {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        }
        .nav-btn {
            background: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 12px 18px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }
        .nav-btn:hover {
            background: #45a049;
            transform: translateY(-2px);
        }
        .nav-btn.blue {
            background: #2196F3;
        }
        .nav-btn.blue:hover {
            background: #1976D2;
        }
    </style>
</head>
<body>
    <div style="padding: 40px; text-align: center;">
        <h1 style="font-size: 48px; margin-bottom: 20px; color: #4CAF50;">🛡️ FortiManager Dashboard</h1>
        <p style="font-size: 20px; color: #aaa; margin-bottom: 40px;">Splunk 통합 보안 운영 대시보드</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1000px; margin: 0 auto;">
            <div style="background: rgba(255,255,255,0.05); padding: 40px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                <h3 style="color: #4CAF50; margin-bottom: 20px; font-size: 24px;">📊 실시간 모니터링</h3>
                <p style="line-height: 1.6; color: #ddd;">1,055개 디바이스 통합 관리<br>실시간 Policy Lookup<br>보안 이벤트 분석</p>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 40px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                <h3 style="color: #4CAF50; margin-bottom: 20px; font-size: 24px;">⚡ 즉시 사용 가능</h3>
                <p style="line-height: 1.6; color: #ddd;">XML 코드 복사 붙여넣기<br>5분 만에 설정 완료<br>상세한 설정 가이드 제공</p>
            </div>
        </div>
    </div>

    <div class="nav-buttons">
        <a href="/xml" class="nav-btn">📝 XML 복사</a>
        <a href="/setup" class="nav-btn blue">⚙️ 설정가이드</a>
    </div>
</body>
</html>`;

const xmlPageHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XML 복사 - Splunk Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1e1e2e; color: white; padding: 20px; margin: 0; }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #4CAF50; margin-bottom: 30px; }
        .xml-container { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin: 20px 0; position: relative; }
        .copy-btn { position: absolute; top: 10px; right: 10px; background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
        pre { white-space: pre-wrap; font-family: 'Consolas', monospace; font-size: 14px; line-height: 1.5; }
        .nav-btn { background: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 10px 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📝 Splunk XML Dashboard 코드</h1>
        <p>복사해서 Splunk에 붙여넣기</p>
    </div>

    <div class="xml-container">
        <button class="copy-btn" onclick="copyXML()">Copy XML</button>
        <pre id="xmlContent">&lt;dashboard version="1.1" theme="dark"&gt;
  &lt;label&gt;FortiManager Security Operations Dashboard&lt;/label&gt;
  &lt;description&gt;Enterprise-grade security monitoring for 1000+ devices&lt;/description&gt;

  &lt;row&gt;
    &lt;panel&gt;
      &lt;title&gt;🛡️ Device Health Status&lt;/title&gt;
      &lt;single&gt;
        &lt;search&gt;
          &lt;query&gt;
            index=fortimanager sourcetype=fmg_device_status
            | stats count(eval(status="up")) as up_count, count as total
            | eval percentage=round(up_count/total*100,2)
            | fields percentage
          &lt;/query&gt;
          &lt;earliest&gt;-5m&lt;/earliest&gt;
          &lt;latest&gt;now&lt;/latest&gt;
          &lt;refresh&gt;30s&lt;/refresh&gt;
        &lt;/search&gt;
        &lt;option name="underLabel"&gt;Device Availability&lt;/option&gt;
        &lt;option name="unit"&gt;%&lt;/option&gt;
        &lt;option name="rangeColors"&gt;["0xDC4E41","0xF1813F","0x53A051"]&lt;/option&gt;
        &lt;option name="rangeValues"&gt;[0,95,98]&lt;/option&gt;
      &lt;/single&gt;
    &lt;/panel&gt;
  &lt;/row&gt;

  &lt;row&gt;
    &lt;panel&gt;
      &lt;title&gt;📊 Policy Lookup Requests&lt;/title&gt;
      &lt;chart&gt;
        &lt;search&gt;
          &lt;query&gt;
            index=fortimanager sourcetype=policy_lookup
            | timechart span=1m count by device_name
          &lt;/query&gt;
          &lt;earliest&gt;-1h&lt;/earliest&gt;
          &lt;latest&gt;now&lt;/latest&gt;
          &lt;refresh&gt;1m&lt;/refresh&gt;
        &lt;/search&gt;
        &lt;option name="charting.chart"&gt;area&lt;/option&gt;
        &lt;option name="charting.legend.placement"&gt;right&lt;/option&gt;
      &lt;/chart&gt;
    &lt;/panel&gt;
  &lt;/row&gt;
&lt;/dashboard&gt;</pre>
    </div>

    <div style="text-align: center; margin: 30px 0;">
        <a href="/" class="nav-btn">← 메인 대시보드</a>
        <a href="/setup" class="nav-btn">설정 가이드 →</a>
    </div>

    <script>
        function copyXML() {
            const content = document.getElementById('xmlContent').textContent;
            navigator.clipboard.writeText(content).then(() => {
                document.querySelector('.copy-btn').textContent = '✓ Copied!';
                setTimeout(() => document.querySelector('.copy-btn').textContent = 'Copy XML', 2000);
            });
        }
    </script>
</body>
</html>`;

const setupPageHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>설정 가이드 - Splunk & FortiNet</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1e1e2e; color: white; padding: 20px; margin: 0; line-height: 1.6; }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #4CAF50; margin-bottom: 30px; }
        .step { background: rgba(255,255,255,0.05); border-radius: 10px; padding: 30px; margin: 20px 0; border-left: 4px solid #4CAF50; }
        .step h3 { color: #4CAF50; margin-bottom: 15px; }
        .code-block { background: #0d1117; border: 1px solid #30363d; padding: 15px; border-radius: 5px; font-family: monospace; margin: 10px 0; overflow-x: auto; }
        .nav-btn { background: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 10px 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>⚙️ Splunk & FortiNet 연동 설정 가이드</h1>
        <p>단계별 상세 설정 방법 - 5분 만에 완료!</p>
    </div>

    <div class="step">
        <h3>1단계: Splunk HEC 설정</h3>
        <p><strong>📍 접속 경로:</strong> Settings → Data Inputs → HTTP Event Collector → New Token</p>
        <div class="code-block">
Name: FortiManager-PolicyLookup
Source Type: fortimanager_policy
Index: fortimanager
Enable Indexer Acknowledgment: Yes
        </div>
        <p><strong>⚠️ 중요:</strong> 생성된 토큰 값을 안전하게 보관하세요!</p>
    </div>

    <div class="step">
        <h3>2단계: FortiManager API 활성화</h3>
        <p><strong>FortiManager CLI에서 실행:</strong></p>
        <div class="code-block">
config system global
    set fmg-status enable
end
        </div>
    </div>

    <div class="step">
        <h3>3단계: FortiGate Policy Lookup 설정</h3>
        <p><strong>각 FortiGate에서 실행:</strong></p>
        <div class="code-block">
config system settings
    set gui-policy-lookup enable
end
        </div>
    </div>

    <div class="step">
        <h3>4단계: 대시보드 XML 설치</h3>
        <p><strong>📍 접속 경로:</strong> Settings → User Interface → Views → New View → Advanced XML</p>
        <p>제공된 XML 코드를 복사하여 붙여넣습니다.</p>
    </div>

    <div class="step">
        <h3>5단계: 연결 테스트</h3>
        <div class="code-block">
# HEC 연결 테스트
curl -k https://your-splunk:8088/services/collector/event \\
  -H "Authorization: Splunk YOUR_TOKEN" \\
  -d '{"event": {"test": "connection"}, "sourcetype": "fortimanager_policy"}'
        </div>
        <p><strong>✅ 성공 응답:</strong> {"text":"Success","code":0}</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
        <a href="/" class="nav-btn">← 메인 대시보드</a>
        <a href="/xml" class="nav-btn">XML 복사하기 →</a>
    </div>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // 라우팅
    switch (url.pathname) {
      case '/xml':
      case '/xml-demo':
        return new Response(xmlPageHTML, { status: 200, headers });

      case '/setup':
      case '/setup-guide':
        return new Response(setupPageHTML, { status: 200, headers });

      default:
        return new Response(dashboardHTML, { status: 200, headers });
    }
  }
};