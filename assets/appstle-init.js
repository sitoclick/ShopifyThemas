(function (window, k) {
    if (!window.AppstleIncluded && (!urlIsProductPage() || 'V1' === 'V2')) {
      window.AppstleIncluded = true;
      appstleLoadScript = function (src, callback) {
        var script = document.createElement("script");
        script.charset = "utf-8";
            script.defer = true;
        script.src = src;
        script.onload = script.onreadystatechange = function () {
          if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = k;
            callback && callback();
          }
        };
            document.getElementsByTagName("body")[0].appendChild(script)
      };


      appstleLoadScript("https://cdn.shopify.com/s/files/1/0251/6300/6033/t/48/assets/appstle-subscription.js?v=1682578575");


      window.RS = Window.RS || {};
      RS.Config = {
        "selectors": {
            "payment_button_selectors": "form[action$='/cart/add'] .shopify-payment-button",
            "subscriptionLinkSelector": "",
            "atcButtonPlacement": "BEFORE",
            "subscriptionLinkPlacement": "BEFORE",
            "cartRowSelector": "",
            "cartLineItemSelector": "",
            "cartLineItemPerQuantityPriceSelector": "",
            "cartLineItemTotalPriceSelector": "",
            "cartLineItemSellingPlanNameSelector": "",
            "cartSubTotalSelector" : "",
            "cartLineItemPriceSelector": "",
        },
        "enableCartWidgetFeature": "false",
        "useUrlWithCustomerId": "true",
        "atcButtonSelector": "",
        "moneyFormat": "{% raw %}{{amount_with_comma_separator}} \u20AC{% endraw %}",
        "oneTimePurchaseText": "Compra \u00FAnica",
        "shop": "tienda-de-sitoclick.myshopify.com",
        "deliveryText": "delivery",
        "purchaseOptionsText": "Opciones de compra",
        "manageSubscriptionButtonText": "Gestionar suscripci\u00F3n",
        "subscriptionOptionText": "Suscr\u00EDbete ( y ahorra!)",
        "sellingPlanSelectTitle": "TIPO DE SUSCRIPCI\u00D3N",
        "subscriptionPriceDisplayText": "",
        "tooltipTitle": "Detalles de la suscripci\u00F3n",
        "showTooltipOnClick": "false",
        "tooltipDesctiption": "<strong>Obt\u00E9n el control de tus suscripciones<\/strong><br\/><br\/>Omite, reprograma, edita o cancelA entregas en cualquier momento, en funci\u00F3n de Tus necesidades.",
        "tooltipDescriptionOnPrepaidPlan": "<b>Detalles del plan de prepago<\/b><\/br>Precio total: {{totalPrice}} ( Precio de cada entrega: {{pricePerDelivery}})",
        "tooltipDescriptionOnMultipleDiscount": "<b>Detalles del descuento<\/b><\/br> El descuento inicial es {{discountOne}} y despu\u00E9s {{discountTwo}}",
        "tooltipDescriptionCustomization": "{{{defaultTooltipDescription}}} <\/br>  {{{prepaidDetails}}} <\/br> {{{discountDetails}}}",
        "orderStatusManageSubscriptionTitle": "Suscripcion",
        "orderStatusManageSubscriptionDescription": "Acceda a su cuenta para ver y gestionar sus suscripciones. Utilice la misma direcci\u00F3n de correo electr\u00F3nico que utiliz\u00F3 para comprar la suscripci\u00F3n.",
        "orderStatusManageSubscriptionButtonText": "Gestione su suscripci\u00F3n",
        "subscriptionOptionSelectedByDefault" : true,
        "totalPricePerDeliveryText" : "{{prepaidPerDeliveryPrice}}\/entrega",
        "memberOnlySellingPlansJson": {},
        "nonMemberOnlySellingPlansJson": {},
        "widgetEnabled": true,
        "showTooltip" : true,
        "sortByDefaultSequence": true,
        "showSubOptionBeforeOneTime": false,
        "showStaticTooltip": false,
        "showAppstleLink": false,
        "sellingPlanTitleText" : "{{sellingPlanName}} ({{sellingPlanPrice}}\/entrega)",
        "oneTimePriceText" : "{{price}}",
        "selectedPayAsYouGoSellingPlanPriceText" : "{{price}}",
        "selectedPrepaidSellingPlanPriceText" : " {{totalPrice}}",
        "selectedDiscountFormat" : "Ahorra {{selectedDiscountPercentage}}",
        "manageSubscriptionBtnFormat" : "<a href='apps\/subscriptions' class='appstle_manageSubBtn' ><button class='btn' style='padding: 2px 20px'>Gestiona tu suscripci\u00F3n<\/button><a><br><br>",
        "manageSubscriptionUrl" : "apps\/subscriptions",
        "appstlePlanId": 162,
        "showCheckoutSubscriptionBtn": true,
        "disableLoadingJquery": false,
        "widgetEnabledOnSoldVariant": "false",
        "switchRadioButtonWidget": true,
        "appstlePlanName": "STARTER",
        "appstlePlanFeatures": {
	"subscriptionOrderAmount": 5000.0,
	"analytics": true,
	"enableSubscriptionManagement": true,
	"enableDunningManagement": true,
	"enableCustomerPortalSettings": true,
	"enableShippingProfiles": true,
	"enableProductSwapAutomation": false,
	"enableAdvancedSellingPlans": false,
	"enableSummaryReports": true,
	"enableCustomEmailDomain": false,
	"enableWidgetPlacement": false,
	"enableIntegrations": true,
	"enableSmsAlert": false,
	"enableCustomEmailHtml": false,
	"enableCancellationManagement": false,
	"enableBundling": true,
	"enableAutomation": false,
	"enableQuickActions": false,
	"enableExternalApi": false,
	"enableCartWidget": false,
	"enableAutoSync": false,
	"webhookAccess": false,
	"accessWidgetDesignOptions": false,
	"accessSubscriptionActivityLogs": true,
	"accessBuildABox": false,
	"accessResendEmail": false,
	"accessKlaviyoContactSync": false,
	"accessOneTimeProductUpsells": false,
	"accessAdvanceSubscriptionPlanOptions": false,
	"accessSplitContract": false,
	"accessDiscountOnCancellationAttempt": false,
	"accessQuickCheckout": false,
	"accessSubscriberLoyaltyFeatures": true,
	"accessBundling": false,
	"accessManualSubscriptionCreation": true,
	"accessAppstleMenu": false
},
        "formMappingAttributeName": "",
        "formMappingAttributeSelector": "",
        "quickViewModalPollingSelector": "",
        "scriptLoadDelay": "0",
        "formatMoneyOverride": "false",
        "appstle_app_proxy_path_prefix": "apps\/subscriptions",
        "updatePriceOnQuantityChange": "",
        "widgetParentSelector": "",
        "quantitySelector": "",
        "enableAddJSInterceptor": "false",
        "reBuyEnabled": "false",
        "loyaltyDetailsLabelText": "",
        "loyaltyPerkDescriptionText": "",
        "widgetTemplateHtml": `{% raw %}{% endraw %}`,
        "bundle": {},
        "labels": "{\"appstle.subscription.wg.yearsFrequencyTextV2\":\"A\u00F1os\",\"appstle.subscription.wg.weekFrequencyTextV2\":\"semana\",\"appstle.subscription.wg.oneTimePurchaseTextV2\":\"One Time Purchase\",\"appstle.subscription.wg.loyaltyPerkDescriptionTextV2\":\"{{#isDiscountTypeFreeProduct}}<div style='display: flex;'><div style='height: 60px; width: 60px; flex-shrink: 0; margin-right: 10px;'><img style='width: 100%' src={{{featured_image}}}><\/img><\/div><div>After {{{billingCycleBlock}}} orders,<span style='color: #ffc000;font-weight: 700;';> get a FREE {{freeProductName}} <\/span><\/div><div>{{\/isDiscountTypeFreeProduct}}{{#isDiscountTypePercentage}}After <span class='appstle-loyalty-billing-cycle'><span class='appstle-loyalty-billing-cycle-count'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class='appstle-loyalty-discount'>get <span style='color: #ffc000;font-weight: 700;';>{{{discount}}}% OFF your entire order<\/span><\/span>.{{\/isDiscountTypePercentage}}{{#isDiscountTypeShipping}}After <span class='appstle-loyalty-billing-cycle'><span class='appstle-loyalty-billing-cycle-count'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class='appstle-loyalty-discount'>get <span style='color: #ffc000;font-weight: 700;';>shipping at {{{formatDiscountedPrice}}}<\/span><\/span>.{{\/isDiscountTypeShipping}}{{#isDiscountTypeFixed}}After <span class='appstle-loyalty-billing-cycle'><span class='appstle-loyalty-billing-cycle-count'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class='appstle-loyalty-discount'>get <span style='color: #ffc000;font-weight: 700;';>{{{formatDiscountedPrice}}} OFF your entire order<\/span><\/span>.{{\/isDiscountTypeFixed}}\",\"appstle.subscription.wg.unsubscribeFrequencyTextV2\":\"darse de baja\",\"appstle.subscription.wg.weeksFrequencyTextV2\":\"Semanas\",\"appstle.subscription.wg.oneTimeFrequencyTextV2\":\"Una vez\",\"appstle.subscription.wg.dayFrequencyTextV2\":\"dia\",\"appstle.subscription.wg.allowFulfilmentCountViaPropertiesV2\":\"false\",\"appstle.subscription.wg.monthsFrequencyTextV2\":\"Meses\",\"appstle.subscription.wg.deliveryEveryFrequencyTextV2\":\"Entrega Cada\",\"appstle.subscription.wg.subscribeAndSaveInitalV2\":\"Suscr\u00EDbete y ahorra\",\"appstle.subscription.wg.offFrequencyTextV2\":\"Descuento\",\"appstle.subscription.wg.yearFrequencyTextV2\":\"A\u00D1o\",\"appstle.subscription.wg.daysFrequencyTextV2\":\"D\u00EDas\",\"appstle.subscription.wg.subscribeAndSaveSuccessV2\":\"Suscripci\u00F3n correcta!\",\"appstle.subscription.wg.monthFrequencyTextV2\":\"Mes\",\"appstle.subscription.wg.selectDeliverOptionV2\":\"seleccionar opci\u00F3n de entrega\"}",
        "css": {
            "appstle_subscription_widget": {
                "margin-top": "" ,
                "margin-bottom": "",
            },

            "appstle_subscription_wrapper": {
                "border-width": "",
                "border-color": "",
            },

            "appstle_circle": {
                "border-color": "",
            },

            "appstle_dot": {
                "background-color": "",
            },

            "appstle_select": {
                "padding-top": "",
                "padding-bottom": "",
                "padding-left": "",
                "padding-right": "",
                "border-width": "",
                "border-style": "",
                "border-color": "",
                "border-radius": "",
            },

            "tooltip_subscription_svg": {
                "fill": "",
            },

            "appstle_tooltip": {
                "color": "",
                "background-color": "",
            },

            "appstle_tooltip_border_top_color": {
                "border-top-color": "",
            },

            "appstle_subscription_final_price": {
                "color": "",
            },
            "appstle_widget_text_color": {
                "color": "",
            },
            "appstle_selected_background": {
                "background": "transparent",
            },
            "customCSS": "",
            "elementCSS": "[]",
            "customerPortalCss": "",
            "priceSelector": "",
            "landingPagePriceSelector": "",
            "quickViewClickSelector": "",
            "badgeTop": "",
            "pricePlacement": "BEFORE"
        }
      };

    }

    function urlIsProductPage() {
    // return null != decodeURIComponent(window.location.pathname).match(/\/products\/(([a-zA-Z0-9]|[\-\.\_\~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[\ud83c\ud83d\ud83e][\ud000-\udfff]){1,})\/?/)
    return decodeURIComponent(window.location.pathname).includes('/products/');
    }
  }
)(window);

