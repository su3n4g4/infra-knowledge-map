---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
Docker compose構成 ^t0000001

ローカルで docker compose を使うとき、各サービスがどこに置かれ、どこで通信を制限しているかを示すマップ。
外からの入口はポート公開だけ。中はサービス名で話す。
説明ページ：[[Docker compose構成]] ^t0000002

ブラウザ
localhost:8080 ^t0000004

ブリッジネットワーク（compose が自動で作る） ^t0000007

[[Nginx]]
web サービス。:80 で HTTP を受け、app へ渡す ^t0000009

アプリケーションサーバー
app サービス。:9000 で受けてコードを実行する。動き方は [[実行モデル]] ^t0000011

[[データベースサーバー]]
db サービス。:3306 で受け、SQL を実行して保存する ^t0000013

[[コンテナのネットワーク]]
ブリッジ・内部 DNS・ポート公開の仕組み ^t0000015

内部の [[DNS]] がサービス名を IP に変える。IP は作り直すと変わるので、接続先は名前で書く（DB_HOST=db） ^t0000017

[[ボリューム]]
db のデータをコンテナの外に残す ^t0000019

-p 8080:80（NAT で転送） ^t0000021

app:9000 ^t0000023

db:3306 ^t0000025

通信の制限
・外から届くのは、公開したポートだけ（-p / ports:）
・同じネットワークの中は、公開しなくても届く
・db の 3306 は公開しない ^t0000028

間違えやすいこと
・コンテナの中の localhost は、そのコンテナ自身。app から localhost:3306 では db に届かない
・接続先は IP ではなくサービス名で書く ^t0000030

%%
## Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin",
	"elements": [
		{
			"id": "f0000005",
			"type": "frame",
			"x": 0,
			"y": 160,
			"width": 1160,
			"height": 660,
			"angle": 0,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 521479528,
			"version": 1,
			"versionNonce": 1236240623,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"name": "ホストOS（localhost:8080 を待ち受ける）"
		},
		{
			"id": "t0000001",
			"type": "text",
			"x": 0,
			"y": -230,
			"width": 354.24,
			"height": 45,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 1282956485,
			"version": 1,
			"versionNonce": 1050110731,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "Docker compose構成",
			"rawText": "Docker compose構成",
			"originalText": "Docker compose構成",
			"fontSize": 36,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 32
		},
		{
			"id": "t0000002",
			"type": "text",
			"x": 0,
			"y": -175,
			"width": 953.2800000000002,
			"height": 67.5,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 614581164,
			"version": 1,
			"versionNonce": 1523356289,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "ローカルで docker compose を使うとき、各サービスがどこに置かれ、どこで通信を制限しているかを示すマップ。\n外からの入口はポート公開だけ。中はサービス名で話す。\n説明ページ：Docker compose構成",
			"rawText": "ローカルで docker compose を使うとき、各サービスがどこに置かれ、どこで通信を制限しているかを示すマップ。\n外からの入口はポート公開だけ。中はサービス名で話す。\n説明ページ：[[Docker compose構成]]",
			"originalText": "ローカルで docker compose を使うとき、各サービスがどこに置かれ、どこで通信を制限しているかを示すマップ。\n外からの入口はポート公開だけ。中はサービス名で話す。\n説明ページ：Docker compose構成",
			"fontSize": 18,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 16
		},
		{
			"id": "r0000003",
			"type": "rectangle",
			"x": 100,
			"y": 0,
			"width": 220,
			"height": 100,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "#99e9f2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"seed": 1778828584,
			"version": 1,
			"versionNonce": 1362067139,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000004"
				},
				{
					"type": "arrow",
					"id": "a0000020"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000004",
			"type": "text",
			"x": 112,
			"y": 27.5,
			"width": 196,
			"height": 45,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 169273698,
			"version": 1,
			"versionNonce": 557414132,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "ブラウザ\nlocalhost:8080",
			"rawText": "ブラウザ\nlocalhost:8080",
			"originalText": "ブラウザ\nlocalhost:8080",
			"fontSize": 18,
			"fontFamily": 2,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "r0000003",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 16
		},
		{
			"id": "r0000006",
			"type": "rectangle",
			"x": 40,
			"y": 220,
			"width": 1080,
			"height": 400,
			"angle": 0,
			"strokeColor": "#2f9e44",
			"backgroundColor": "#ebfbee",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 3
			},
			"seed": 916811456,
			"version": 1,
			"versionNonce": 171389418,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000007",
			"type": "text",
			"x": 56,
			"y": 230,
			"width": 359.68000000000006,
			"height": 20,
			"angle": 0,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 220143459,
			"version": 1,
			"versionNonce": 532676401,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "ブリッジネットワーク（compose が自動で作る）",
			"rawText": "ブリッジネットワーク（compose が自動で作る）",
			"originalText": "ブリッジネットワーク（compose が自動で作る）",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "r0000008",
			"type": "rectangle",
			"x": 80,
			"y": 280,
			"width": 260,
			"height": 130,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 3
			},
			"seed": 1080015781,
			"version": 1,
			"versionNonce": 101392819,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000009"
				},
				{
					"type": "arrow",
					"id": "a0000020"
				},
				{
					"type": "arrow",
					"id": "a0000022"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000009",
			"type": "text",
			"x": 92,
			"y": 315,
			"width": 236,
			"height": 60,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 1323608593,
			"version": 1,
			"versionNonce": 608375513,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "Nginx\nweb サービス。:80 で HTTP \nを受け、app へ渡す",
			"rawText": "[[Nginx]]\nweb サービス。:80 で HTTP を受け、app へ渡す",
			"originalText": "Nginx\nweb サービス。:80 で HTTP を受け、app へ渡す",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000008",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "r0000010",
			"type": "rectangle",
			"x": 440,
			"y": 280,
			"width": 260,
			"height": 130,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 3
			},
			"seed": 1243882817,
			"version": 1,
			"versionNonce": 705142664,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000011"
				},
				{
					"type": "arrow",
					"id": "a0000022"
				},
				{
					"type": "arrow",
					"id": "a0000024"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000011",
			"type": "text",
			"x": 452,
			"y": 305,
			"width": 236,
			"height": 80,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 1351481953,
			"version": 1,
			"versionNonce": 1403872850,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "アプリケーションサーバー\napp サービス。:9000 で受けて\nコードを実行する。動き方は 実\n行モデル",
			"rawText": "アプリケーションサーバー\napp サービス。:9000 で受けてコードを実行する。動き方は [[実行モデル]]",
			"originalText": "アプリケーションサーバー\napp サービス。:9000 で受けてコードを実行する。動き方は 実行モデル",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000010",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "r0000012",
			"type": "rectangle",
			"x": 800,
			"y": 280,
			"width": 260,
			"height": 130,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 3
			},
			"seed": 1740468937,
			"version": 1,
			"versionNonce": 1146229728,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000013"
				},
				{
					"type": "arrow",
					"id": "a0000024"
				},
				{
					"type": "arrow",
					"id": "a0000026"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000013",
			"type": "text",
			"x": 812,
			"y": 315,
			"width": 236,
			"height": 60,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 306508643,
			"version": 1,
			"versionNonce": 1105618991,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "データベースサーバー\ndb サービス。:3306 で受け、S\nQL を実行して保存する",
			"rawText": "[[データベースサーバー]]\ndb サービス。:3306 で受け、SQL を実行して保存する",
			"originalText": "データベースサーバー\ndb サービス。:3306 で受け、SQL を実行して保存する",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000012",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "r0000014",
			"type": "rectangle",
			"x": 80,
			"y": 450,
			"width": 260,
			"height": 130,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 3
			},
			"seed": 579157218,
			"version": 1,
			"versionNonce": 1721963019,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000015"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000015",
			"type": "text",
			"x": 92,
			"y": 485,
			"width": 236,
			"height": 60,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 1903439722,
			"version": 1,
			"versionNonce": 221053493,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "コンテナのネットワーク\nブリッジ・内部 DNS・ポート公\n開の仕組み",
			"rawText": "[[コンテナのネットワーク]]\nブリッジ・内部 DNS・ポート公開の仕組み",
			"originalText": "コンテナのネットワーク\nブリッジ・内部 DNS・ポート公開の仕組み",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000014",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "r0000016",
			"type": "rectangle",
			"x": 380,
			"y": 450,
			"width": 380,
			"height": 130,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "#b2f2bb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 3
			},
			"seed": 1618753592,
			"version": 1,
			"versionNonce": 1632434968,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000017"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000017",
			"type": "text",
			"x": 392,
			"y": 485,
			"width": 356,
			"height": 60,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 505030718,
			"version": 1,
			"versionNonce": 2007447313,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "内部の DNS がサービス名を IP に変える。IP \nは作り直すと変わるので、接続先は名前で書く（\nDB_HOST=db）",
			"rawText": "内部の [[DNS]] がサービス名を IP に変える。IP は作り直すと変わるので、接続先は名前で書く（DB_HOST=db）",
			"originalText": "内部の DNS がサービス名を IP に変える。IP は作り直すと変わるので、接続先は名前で書く（DB_HOST=db）",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000016",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "r0000018",
			"type": "rectangle",
			"x": 800,
			"y": 660,
			"width": 260,
			"height": 120,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 3
			},
			"seed": 1966646841,
			"version": 1,
			"versionNonce": 917597288,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000019"
				},
				{
					"type": "arrow",
					"id": "a0000026"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000019",
			"type": "text",
			"x": 812,
			"y": 690,
			"width": 236,
			"height": 60,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 723259857,
			"version": 1,
			"versionNonce": 1051143750,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "ボリューム\ndb のデータをコンテナの外に残\nす",
			"rawText": "[[ボリューム]]\ndb のデータをコンテナの外に残す",
			"originalText": "ボリューム\ndb のデータをコンテナの外に残す",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000018",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "a0000020",
			"type": "arrow",
			"x": 210,
			"y": 100,
			"width": 0,
			"height": 180,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"seed": 1204078244,
			"version": 1,
			"versionNonce": 220877544,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000021"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					0,
					180
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "r0000003",
				"focus": 0,
				"gap": 4
			},
			"endBinding": {
				"elementId": "r0000008",
				"focus": 0,
				"gap": 4
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "t0000021",
			"type": "text",
			"x": 10,
			"y": 181.25,
			"width": 400,
			"height": 17.5,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 1380769841,
			"version": 1,
			"versionNonce": 1939753305,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "-p 8080:80（NAT で転送）",
			"rawText": "-p 8080:80（NAT で転送）",
			"originalText": "-p 8080:80（NAT で転送）",
			"fontSize": 14,
			"fontFamily": 2,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "a0000020",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 13
		},
		{
			"id": "a0000022",
			"type": "arrow",
			"x": 340,
			"y": 345,
			"width": 100,
			"height": 0,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 2
			},
			"seed": 1281405659,
			"version": 1,
			"versionNonce": 1242248939,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000023"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					100,
					0
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "r0000008",
				"focus": 0,
				"gap": 4
			},
			"endBinding": {
				"elementId": "r0000010",
				"focus": 0,
				"gap": 4
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "t0000023",
			"type": "text",
			"x": 190,
			"y": 336.25,
			"width": 400,
			"height": 17.5,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 2069093882,
			"version": 1,
			"versionNonce": 1844906169,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "app:9000",
			"rawText": "app:9000",
			"originalText": "app:9000",
			"fontSize": 14,
			"fontFamily": 2,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "a0000022",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 13
		},
		{
			"id": "a0000024",
			"type": "arrow",
			"x": 700,
			"y": 345,
			"width": 100,
			"height": 0,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 2
			},
			"seed": 611630181,
			"version": 1,
			"versionNonce": 980696039,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000025"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					100,
					0
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "r0000010",
				"focus": 0,
				"gap": 4
			},
			"endBinding": {
				"elementId": "r0000012",
				"focus": 0,
				"gap": 4
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "t0000025",
			"type": "text",
			"x": 550,
			"y": 336.25,
			"width": 400,
			"height": 17.5,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": null,
			"seed": 985818441,
			"version": 1,
			"versionNonce": 1276283545,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "db:3306",
			"rawText": "db:3306",
			"originalText": "db:3306",
			"fontSize": 14,
			"fontFamily": 2,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "a0000024",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 13
		},
		{
			"id": "a0000026",
			"type": "arrow",
			"x": 930,
			"y": 410,
			"width": 0,
			"height": 250,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": "f0000005",
			"roundness": {
				"type": 2
			},
			"seed": 756184759,
			"version": 1,
			"versionNonce": 1510374774,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					0,
					250
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "r0000012",
				"focus": 0,
				"gap": 4
			},
			"endBinding": {
				"elementId": "r0000018",
				"focus": 0,
				"gap": 4
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "r0000027",
			"type": "rectangle",
			"x": 1220,
			"y": 160,
			"width": 400,
			"height": 200,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "#ffc9c9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"seed": 1261222776,
			"version": 1,
			"versionNonce": 587710820,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000028"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000028",
			"type": "text",
			"x": 1232,
			"y": 210,
			"width": 376,
			"height": 100,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 855798454,
			"version": 1,
			"versionNonce": 2055360981,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "通信の制限\n・外から届くのは、公開したポートだけ（-p / por\nts:）\n・同じネットワークの中は、公開しなくても届く\n・db の 3306 は公開しない",
			"rawText": "通信の制限\n・外から届くのは、公開したポートだけ（-p / ports:）\n・同じネットワークの中は、公開しなくても届く\n・db の 3306 は公開しない",
			"originalText": "通信の制限\n・外から届くのは、公開したポートだけ（-p / ports:）\n・同じネットワークの中は、公開しなくても届く\n・db の 3306 は公開しない",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000027",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"id": "r0000029",
			"type": "rectangle",
			"x": 1220,
			"y": 400,
			"width": 400,
			"height": 200,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "#b2f2bb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"seed": 1794233414,
			"version": 1,
			"versionNonce": 1737409263,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "t0000030"
				}
			],
			"updated": 1795300000000,
			"link": null,
			"locked": false
		},
		{
			"id": "t0000030",
			"type": "text",
			"x": 1232,
			"y": 450,
			"width": 376,
			"height": 100,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 407942954,
			"version": 1,
			"versionNonce": 881622934,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1795300000000,
			"link": null,
			"locked": false,
			"text": "間違えやすいこと\n・コンテナの中の localhost は、そのコンテナ自\n身。app から localhost:3306 では db に届かな\nい\n・接続先は IP ではなくサービス名で書く",
			"rawText": "間違えやすいこと\n・コンテナの中の localhost は、そのコンテナ自身。app から localhost:3306 では db に届かない\n・接続先は IP ではなくサービス名で書く",
			"originalText": "間違えやすいこと\n・コンテナの中の localhost は、そのコンテナ自身。app から localhost:3306 では db に届かない\n・接続先は IP ではなくサービス名で書く",
			"fontSize": 16,
			"fontFamily": 2,
			"textAlign": "left",
			"verticalAlign": "middle",
			"containerId": "r0000029",
			"autoResize": true,
			"lineHeight": 1.25,
			"baseline": 14
		}
	],
	"appState": {
		"gridSize": 20,
		"viewBackgroundColor": "#ffffff",
		"currentItemFontFamily": 2,
		"currentItemRoughness": 0
	},
	"files": {}
}
```
%%