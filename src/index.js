// Splunk FortiManager Dashboard Demo Site
const dashboardHTML = `
<!DOCTYPE html>
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
        .header {
            background: rgba(0,0,0,0.3);
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .header h1 {
            font-size: 24px;
            font-weight: 300;
            margin-bottom: 10px;
        }
        .header .subtitle {
            color: #aaa;
            font-size: 14px;
        }
        .container {
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 20px;
            backdrop-filter: blur(10px);
        }
        .stat-card h3 {
            font-size: 14px;
            color: #aaa;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .stat-value {
            font-size: 36px;
            font-weight: 600;
            color: #4CAF50;
            margin-bottom: 5px;
        }
        .stat-change {
            font-size: 12px;
            color: #66bb6a;
        }
        .dashboard-section {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 18px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .firewall-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 20px;
        }
        .firewall-card {
            background: rgba(0,0,0,0.2);
            padding: 15px;
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .firewall-name {
            font-weight: 600;
            margin-bottom: 8px;
            color: #81c784;
        }
        .firewall-stat {
            font-size: 12px;
            color: #aaa;
            margin: 4px 0;
        }
        .policy-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .policy-table th {
            background: rgba(0,0,0,0.3);
            padding: 10px;
            text-align: left;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #aaa;
        }
        .policy-table td {
            padding: 10px;
            border-top: 1px solid rgba(255,255,255,0.05);
            font-size: 14px;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .status-active { background: #4CAF50; color: white; }
        .status-inactive { background: #666; color: white; }
        .status-warning { background: #ff9800; color: white; }
        .xml-viewer {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 6px;
            padding: 20px;
            margin-top: 20px;
            position: relative;
        }
        .xml-viewer pre {
            color: #aaa;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 12px;
            overflow-x: auto;
            max-height: 400px;
        }
        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
        }
        .copy-button:hover {
            background: #45a049;
            transform: translateY(-2px);
        }
        .traffic-flow {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            margin: 20px 0;
        }
        .flow-node {
            text-align: center;
            flex: 1;
        }
        .flow-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            font-size: 24px;
        }
        .flow-arrow {
            flex: 0.5;
            text-align: center;
            color: #4CAF50;
            font-size: 24px;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .live-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #4CAF50;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛡️ FortiManager Security Operations Dashboard</h1>
        <div class="subtitle">
            <span class="live-indicator"></span>
            실시간 모니터링 | 1,055개 디바이스 관리 | Splunk 통합
        </div>
    </div>

    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <h3>관리 중인 방화벽</h3>
                <div class="stat-value">1,055</div>
                <div class="stat-change">↑ 12 이번 주 추가</div>
            </div>
            <div class="stat-card">
                <h3>활성 정책</h3>
                <div class="stat-value">42,851</div>
                <div class="stat-change">98.7% 효율성</div>
            </div>
            <div class="stat-card">
                <h3>일일 트래픽</h3>
                <div class="stat-value">2.4TB</div>
                <div class="stat-change">↑ 15% 전일 대비</div>
            </div>
            <div class="stat-card">
                <h3>보안 이벤트</h3>
                <div class="stat-value">327</div>
                <div class="stat-change">↓ 8% 감소 추세</div>
            </div>
        </div>

        <div class="dashboard-section">
            <h2 class="section-title">🔄 트래픽 플로우 아키텍처</h2>
            <div class="traffic-flow">
                <div class="flow-node">
                    <div class="flow-icon">🌐</div>
                    <div>인터넷</div>
                    <div style="font-size: 12px; color: #aaa;">외부 트래픽</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-icon">🛡️</div>
                    <div>Perimeter FW</div>
                    <div style="font-size: 12px; color: #aaa;">1차 방어</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-icon">🔒</div>
                    <div>Internal FW</div>
                    <div style="font-size: 12px; color: #aaa;">2차 검증</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-node">
                    <div class="flow-icon">💼</div>
                    <div>DMZ FW</div>
                    <div style="font-size: 12px; color: #aaa;">서비스 보호</div>
                </div>
            </div>
        </div>

        <div class="dashboard-section">
            <h2 class="section-title">🔥 주요 방화벽 상태</h2>
            <div class="firewall-grid">
                <div class="firewall-card">
                    <div class="firewall-name">PERIMETER-FW-001</div>
                    <div class="firewall-stat">CPU: 45%</div>
                    <div class="firewall-stat">메모리: 62%</div>
                    <div class="firewall-stat">세션: 128,451</div>
                    <div class="firewall-stat">정책: 1,842</div>
                </div>
                <div class="firewall-card">
                    <div class="firewall-name">INTERNAL-FW-001</div>
                    <div class="firewall-stat">CPU: 38%</div>
                    <div class="firewall-stat">메모리: 55%</div>
                    <div class="firewall-stat">세션: 98,234</div>
                    <div class="firewall-stat">정책: 2,156</div>
                </div>
                <div class="firewall-card">
                    <div class="firewall-name">DMZ-FW-001</div>
                    <div class="firewall-stat">CPU: 52%</div>
                    <div class="firewall-stat">메모리: 71%</div>
                    <div class="firewall-stat">세션: 156,789</div>
                    <div class="firewall-stat">정책: 892</div>
                </div>
            </div>
        </div>

        <div class="dashboard-section">
            <h2 class="section-title">📊 Policy Lookup 최근 조회</h2>
            <table class="policy-table">
                <thead>
                    <tr>
                        <th>시간</th>
                        <th>소스 IP</th>
                        <th>목적지 IP</th>
                        <th>서비스</th>
                        <th>정책 ID</th>
                        <th>결과</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>10:23:45</td>
                        <td>192.168.1.100</td>
                        <td>10.0.50.200</td>
                        <td>HTTPS</td>
                        <td>#1842</td>
                        <td>ALLOW</td>
                        <td><span class="status-badge status-active">활성</span></td>
                    </tr>
                    <tr>
                        <td>10:23:41</td>
                        <td>172.16.5.50</td>
                        <td>8.8.8.8</td>
                        <td>DNS</td>
                        <td>#2156</td>
                        <td>ALLOW</td>
                        <td><span class="status-badge status-active">활성</span></td>
                    </tr>
                    <tr>
                        <td>10:23:38</td>
                        <td>10.0.10.15</td>
                        <td>192.168.100.50</td>
                        <td>SSH</td>
                        <td>#892</td>
                        <td>DENY</td>
                        <td><span class="status-badge status-warning">차단</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="dashboard-section">
            <h2 class="section-title">📝 Splunk Dashboard XML (Enterprise Grade)</h2>
            <div class="xml-viewer">
                <button class="copy-button" onclick="copyXML()">XML 복사</button>
                <pre id="xmlContent"><code>&lt;dashboard version="1.1" theme="dark"&gt;
  &lt;label&gt;FortiManager Security Operations Dashboard&lt;/label&gt;
  &lt;description&gt;Enterprise-grade security monitoring for 1000+ devices&lt;/description&gt;

  &lt;row&gt;
    &lt;panel&gt;
      &lt;title&gt;Device Health Status&lt;/title&gt;
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
        &lt;option name="drilldown"&gt;none&lt;/option&gt;
        &lt;option name="underLabel"&gt;Device Availability&lt;/option&gt;
        &lt;option name="unit"&gt;%&lt;/option&gt;
        &lt;option name="rangeColors"&gt;["0x DC4E41","0xF1813F","0x53A051"]&lt;/option&gt;
        &lt;option name="rangeValues"&gt;[0,95,98]&lt;/option&gt;
      &lt;/single&gt;
    &lt;/panel&gt;
  &lt;/row&gt;

  &lt;row&gt;
    &lt;panel&gt;
      &lt;title&gt;Policy Lookup Requests&lt;/title&gt;
      &lt;chart&gt;
        &lt;search&gt;
          &lt;query&gt;
            index=fortimanager sourcetype=policy_lookup
            | timechart span=1m count by device_name
            | fillnull value=0
          &lt;/query&gt;
          &lt;earliest&gt;-1h&lt;/earliest&gt;
          &lt;latest&gt;now&lt;/latest&gt;
          &lt;refresh&gt;1m&lt;/refresh&gt;
        &lt;/search&gt;
        &lt;option name="charting.chart"&gt;area&lt;/option&gt;
        &lt;option name="charting.axisTitleX.text"&gt;Time&lt;/option&gt;
        &lt;option name="charting.axisTitleY.text"&gt;Requests&lt;/option&gt;
        &lt;option name="charting.legend.placement"&gt;right&lt;/option&gt;
      &lt;/chart&gt;
    &lt;/panel&gt;
  &lt;/row&gt;

  &lt;row&gt;
    &lt;panel&gt;
      &lt;title&gt;Security Event Distribution&lt;/title&gt;
      &lt;viz type="sankey_diagram_app.sankey_diagram"&gt;
        &lt;search&gt;
          &lt;query&gt;
            index=fortimanager sourcetype=security_events
            | stats count by src_zone, dst_zone, action
            | sort -count
            | head 20
          &lt;/query&gt;
          &lt;earliest&gt;-24h&lt;/earliest&gt;
          &lt;latest&gt;now&lt;/latest&gt;
        &lt;/search&gt;
      &lt;/viz&gt;
    &lt;/panel&gt;
  &lt;/row&gt;
&lt;/dashboard&gt;</code></pre>
            </div>
        </div>

        <div class="dashboard-section">
            <h2 class="section-title">🚀 Splunk HEC Configuration</h2>
            <div class="xml-viewer">
                <pre><code># Splunk HEC Token 설정
Token Name: FortiManager-PolicyLookup
Token Value: 8f7a2b4e-1234-5678-90ab-cdef12345678
Source Type: fortimanager_policy
Index: fortimanager

# Data Input 설정
Protocol: HTTPS
Port: 8088
Enable SSL: Yes
Index Acknowledgment: Enabled

# 샘플 이벤트 전송
curl -k https://splunk.example.com:8088/services/collector/event \\
  -H "Authorization: Splunk 8f7a2b4e-1234-5678-90ab-cdef12345678" \\
  -d '{
    "time": 1702345678,
    "source": "FortiManager",
    "sourcetype": "policy_lookup",
    "event": {
      "device": "PERIMETER-FW-001",
      "src_ip": "192.168.1.100",
      "dst_ip": "10.0.50.200",
      "service": "HTTPS",
      "policy_id": 1842,
      "action": "ALLOW",
      "lookup_time_ms": 45
    }
  }'</code></pre>
            </div>
        </div>
    </div>

    <script>
        function copyXML() {
            const xmlContent = document.getElementById('xmlContent').innerText;
            navigator.clipboard.writeText(xmlContent).then(() => {
                const button = document.querySelector('.copy-button');
                button.textContent = '✓ 복사됨!';
                button.style.background = '#4CAF50';
                setTimeout(() => {
                    button.textContent = 'XML 복사';
                    button.style.background = '#4CAF50';
                }, 2000);
            });
        }

        // 실시간 데이터 시뮬레이션
        setInterval(() => {
            const statValues = document.querySelectorAll('.stat-value');
            statValues[3].textContent = Math.floor(Math.random() * 50 + 300);

            // 트래픽 플로우 애니메이션
            const flowArrows = document.querySelectorAll('.flow-arrow');
            flowArrows.forEach(arrow => {
                arrow.style.opacity = Math.random() > 0.5 ? '1' : '0.5';
            });
        }, 3000);
    </script>
</body>
</html>
`;

// XML Demo HTML과 Setup Guide HTML을 문자열로 import (실제로는 별도 파일에서 읽어올 수 있음)
const xmlDemoHTML = `<!-- XML Demo HTML content will be loaded here -->`;
const setupGuideHTML = `<!-- Setup Guide HTML content will be loaded here -->`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS 헤더 설정
    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600'
    };

    // OPTIONS 요청 처리
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // 라우팅 처리
    switch (url.pathname) {
      case '/xml':
      case '/xml-demo':
        // XML 데모 페이지
        return new Response(\`<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XML Demo - FortiManager Splunk Integration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #1e1e2e;
            color: white;
            padding: 20px;
            margin: 0;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #4CAF50;
            margin-bottom: 30px;
        }
        .xml-container {
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            position: relative;
        }
        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        pre {
            white-space: pre-wrap;
            font-family: 'Consolas', monospace;
            font-size: 14px;
            line-height: 1.5;
        }
        .nav-btn {
            background: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛡️ Splunk XML Dashboard Generator</h1>
        <p>FortiManager Security Operations - Ready-to-Use XML Templates</p>
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

    <div class="xml-container">
        <h3>🚀 HEC 설정</h3>
        <button class="copy-btn" onclick="copyHEC()">Copy HEC</button>
        <pre id="hecContent"># Splunk HEC Token 설정
Token Name: FortiManager-PolicyLookup
Source Type: fortimanager_policy
Index: fortimanager

# 테스트 명령어
curl -k https://splunk.example.com:8088/services/collector/event \\
  -H "Authorization: Splunk YOUR_TOKEN_HERE" \\
  -d '{
    "time": 1702345678,
    "source": "FortiManager",
    "sourcetype": "policy_lookup",
    "event": {
      "device": "PERIMETER-FW-001",
      "src_ip": "192.168.1.100",
      "dst_ip": "10.0.50.200",
      "service": "HTTPS",
      "policy_id": 1842,
      "action": "ALLOW"
    }
  }'</pre>
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

        function copyHEC() {
            const content = document.getElementById('hecContent').textContent;
            navigator.clipboard.writeText(content).then(() => {
                event.target.textContent = '✓ Copied!';
                setTimeout(() => event.target.textContent = 'Copy HEC', 2000);
            });
        }
    </script>
</body>
</html>\`, {
          status: 200,
          headers
        });

      case '/setup':
      case '/setup-guide':
        // 설정 가이드 페이지
        return new Response(\`<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>설정 가이드 - Splunk & FortiNet</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #1e1e2e;
            color: white;
            padding: 20px;
            margin: 0;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #4CAF50;
            margin-bottom: 30px;
        }
        .step {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 30px;
            margin: 20px 0;
            border-left: 4px solid #4CAF50;
        }
        .step h3 {
            color: #4CAF50;
            margin-bottom: 15px;
        }
        .code-block {
            background: #0d1117;
            border: 1px solid #30363d;
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
            margin: 10px 0;
            overflow-x: auto;
        }
        .nav-btn {
            background: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔧 Splunk & FortiNet 연동 설정 가이드</h1>
        <p>단계별 상세 설정 방법</p>
    </div>

    <div class="step">
        <h3>1단계: Splunk HEC (HTTP Event Collector) 설정</h3>
        <p><strong>접속 경로:</strong> Settings → Data Inputs → HTTP Event Collector → New Token</p>
        <div class="code-block">
Name: FortiManager-PolicyLookup
Source Type: fortimanager_policy
Index: fortimanager
Enable Indexer Acknowledgment: Yes
        </div>
        <p><strong>⚠️ 주의:</strong> 생성된 토큰 값은 안전한 곳에 보관하세요.</p>
    </div>

    <div class="step">
        <h3>2단계: Splunk Index 생성</h3>
        <p><strong>접속 경로:</strong> Settings → Indexes → New Index</p>
        <div class="code-block">
# CLI 명령어
./splunk add index fortimanager

# 권장 설정:
Index Name: fortimanager
Max Size: 10GB
Max Buckets: Hot=10, Warm=20
        </div>
    </div>

    <div class="step">
        <h3>3단계: FortiManager API 활성화</h3>
        <p><strong>FortiManager CLI에서 실행:</strong></p>
        <div class="code-block">
config system admin setting
    set gui-curl-timeout 120
    set gui-polling-interval 10
end

config system global
    set fmg-status enable
end
        </div>
    </div>

    <div class="step">
        <h3>4단계: FortiGate Policy Lookup 설정</h3>
        <p><strong>각 FortiGate에서 실행:</strong></p>
        <div class="code-block">
config system settings
    set gui-policy-lookup enable
end

# 또는 GUI: System → Feature Visibility → Policy Lookup 체크
        </div>
    </div>

    <div class="step">
        <h3>5단계: 대시보드 XML 설치</h3>
        <p><strong>접속 경로:</strong> Settings → User Interface → Views → New View → Advanced XML</p>
        <p>제공된 XML 코드를 복사하여 붙여넣습니다.</p>
    </div>

    <div class="step">
        <h3>6단계: 연결 테스트</h3>
        <div class="code-block">
# HEC 연결 테스트
curl -k https://your-splunk:8088/services/collector/event \\
  -H "Authorization: Splunk YOUR_TOKEN" \\
  -d '{"event": {"test": "connection"}, "sourcetype": "fortimanager_policy"}'

# 성공 응답: {"text":"Success","code":0}
        </div>
    </div>

    <div style="text-align: center; margin: 30px 0;">
        <a href="/" class="nav-btn">← 메인 대시보드</a>
        <a href="/xml" class="nav-btn">XML 복사하기 →</a>
    </div>
</body>
</html>\`, {
          status: 200,
          headers
        });

      default:
        // 메인 대시보드 반환 (navigation 추가)
        return new Response(dashboardHTML.replace(
          '</body>',
          \`
    <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
        <a href="/xml" style="background: #4CAF50; color: white; text-decoration: none; padding: 10px 15px; border-radius: 5px; margin: 5px; display: inline-block; font-size: 14px;">📝 XML 복사</a>
        <a href="/setup" style="background: #2196F3; color: white; text-decoration: none; padding: 10px 15px; border-radius: 5px; margin: 5px; display: inline-block; font-size: 14px;">⚙️ 설정가이드</a>
    </div>
</body>\`
        ), {
          status: 200,
          headers
        });
    }
  }
};