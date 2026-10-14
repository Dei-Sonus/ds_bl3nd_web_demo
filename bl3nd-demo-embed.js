// Embeds the BL3ND browser demo in any page.
//
//   <div data-bl3nd-demo></div>
//   <script src="https://<where the bundle is served>/bl3nd-demo-embed.js" defer></script>
//
// Every element with `data-bl3nd-demo` gets the demo in an iframe, sized to
// the element's width at the plugin window's aspect ratio. The iframe keeps
// the demo's styles and scripts apart from the host page. Options, as
// attributes on the element:
//
//   data-src     the demo's index.html (default: next to this script)
//   data-title   accessible title (default: "BL3ND plugin demo")
//
// Or call `Bl3ndDemo.mount (element, { src, title })` yourself.

(() =>
{
    // The plugin window's design size and aspect ratio (webview/src/app/app.ts).
    const ASPECT = 1250 / 750;
    const script = document.currentScript;
    const defaultSrc = new URL ('index.html', script?.src ?? location.href).href;

    function mount (element, options = {})
    {
        if (element.querySelector ('iframe[data-bl3nd-demo-frame]') !== null)
            return;

        const frame = document.createElement ('iframe');
        frame.dataset.bl3ndDemoFrame = '';
        frame.src = options.src ?? element.dataset.src ?? defaultSrc;
        frame.title = options.title ?? element.dataset.title ?? 'BL3ND plugin demo';
        // cross-origin-isolated: a threaded engine needs the page isolated, and
        // inside an iframe that also takes the embedding page sending COOP /
        // COEP and granting it here (the demo is cross-origin to that page).
        frame.allow = 'autoplay; cross-origin-isolated';
        frame.loading = 'lazy';
        frame.style.cssText = 'display:block;width:100%;border:0;border-radius:12px;background:#000;'
                            + `aspect-ratio:${ASPECT};`;
        element.appendChild (frame);
    }

    function mountAll()
    {
        document.querySelectorAll ('[data-bl3nd-demo]').forEach ((element) => mount (element));
    }

    window.Bl3ndDemo = { mount };

    if (document.readyState === 'loading')
        document.addEventListener ('DOMContentLoaded', mountAll);
    else
        mountAll();
})();
