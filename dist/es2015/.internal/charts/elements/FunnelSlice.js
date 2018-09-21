/**
 * Module that defines everything related to building FunnelSlices.
 */
import * as tslib_1 from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import { percent } from "../../core/utils/Percent";
import * as $utils from "../../core/utils/Utils";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to create [[FunnelSlice]] elements.
 *
 * @see {@link IFunnelSliceEvents} for a list of available events
 * @see {@link IFunnelSliceAdapters} for a list of available adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/funnel-chart/} for documentation
 * @important
 */
var FunnelSlice = /** @class */ (function (_super) {
    tslib_1.__extends(FunnelSlice, _super);
    /**
     * Constructor
     */
    function FunnelSlice() {
        var _this = _super.call(this) || this;
        _this.slice = _this.createChild(Sprite);
        _this.slice.element = _this.paper.add("path");
        _this.slice.isMeasured = false;
        _this.orientation = "vertical";
        _this.bottomWidth = percent(100);
        _this.topWidth = percent(100);
        _this.isMeasured = false;
        _this.width = 10;
        _this.height = 10;
        _this.expandDistance = 0;
        _this.className = "FunnelSlice";
        _this.events.on("maxsizechanged", function () {
            _this.invalidate();
        });
        return _this;
    }
    /**
     * Draws the element.
     */
    FunnelSlice.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var pt = this.pixelPaddingTop;
        var pb = this.pixelPaddingBottom;
        var pr = this.pixelPaddingRight;
        var pl = this.pixelPaddingLeft;
        var w = this.pixelWidth - pr - pl;
        var h = this.pixelHeight - pt - pb;
        var ed = this.expandDistance;
        var path = "";
        if (this.orientation == "vertical") {
            var tw = $utils.relativeToValue(this.topWidth, w);
            var bw = $utils.relativeToValue(this.bottomWidth, w);
            var tl = { x: (w - tw) / 2 + pl, y: pt };
            var tr = { x: (w + tw) / 2 + pl, y: pt };
            var br = { x: (w + bw) / 2 + pl, y: pt + h };
            var bl = { x: (w - bw) / 2 + pl, y: pt + h };
            var cpr = { x: tr.x + (br.x - tr.x) / 2 + ed * h, y: tr.y + 0.5 * h };
            var cpl = { x: tl.x + (bl.x - tl.x) / 2 - ed * h, y: tl.y + 0.5 * h };
            path = $path.moveTo(tl) + $path.lineTo(tr) + $path.quadraticCurveTo(br, cpr) + $path.lineTo(bl) + $path.quadraticCurveTo(tl, cpl);
            this.tickPoint = { x: tr.x + (br.x - tr.x) / 2, y: tr.y + (br.y - tr.y) / 2 };
        }
        else {
            var tw = $utils.relativeToValue(this.topWidth, h);
            var bw = $utils.relativeToValue(this.bottomWidth, h);
            var tt = { x: pl, y: (h - tw) / 2 + pt };
            var tb = { x: pl, y: (h + tw) / 2 + pt };
            var bt = { x: pl + w, y: (h - bw) / 2 + pt };
            var bb = { x: pl + w, y: (h + bw) / 2 + pt };
            var cpr = { y: tt.y + (bt.y - tt.y) / 2 - ed * w, x: tt.x + 0.5 * w };
            var cpl = { y: tb.y + (bb.y - tb.y) / 2 + ed * w, x: tb.x + 0.5 * w };
            path = $path.moveTo(tb) + $path.lineTo(tt) + $path.quadraticCurveTo(bt, cpr) + $path.lineTo(bb) + $path.quadraticCurveTo(tb, cpl);
            this.tickPoint = { y: tb.y + (bb.y - tb.y) / 2, x: tb.x + (bb.x - tb.x) / 2 };
        }
        this.slice.path = path;
        this.invalidateLayout();
    };
    Object.defineProperty(FunnelSlice.prototype, "bottomWidth", {
        /**
         * @return {number} bottom width
         */
        get: function () {
            return this.getPropertyValue("bottomWidth");
        },
        /**
         * Bottom width in pixels or percent.
         *
         * IMPORTANT: this setting might be used to set dimensions if you use slice
         * as a standalone element. If it's a part of [[FunnelSeries]] this setting
         * becomes read-only as it will be automatically reset by series.
         *
         * @param {number}  value  Bottom width
         */
        set: function (value) {
            this.setPropertyValue("bottomWidth", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunnelSlice.prototype, "topWidth", {
        /**
         * @return {number} Top width
         */
        get: function () {
            return this.getPropertyValue("topWidth");
        },
        /**
         * Top width in pixels or percent.
         *
         * IMPORTANT: this setting might be used to set dimensions if you use slice
         * as a standalone element. If it's a part of [[FunnelSeries]] this setting
         * becomes read-only as it will be automatically reset by series.
         *
         * @param {number}  value  Top width
         */
        set: function (value) {
            this.setPropertyValue("topWidth", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunnelSlice.prototype, "orientation", {
        /**
         * @return {Orientation} Orientation
         */
        get: function () {
            return this.getPropertyValue("orientation");
        },
        /**
         * Orientation of the funnel slice: "horizontal" or "vertical".
         *
         * IMPORTANT: this setting might be used to set orintation if you use slice
         * as a standalone element. If it's a part of [[FunnelSeries]] this setting
         * becomes read-only as it will be automatically reset by series.
         *
         * @param {Orientation}  value  Orientation
         */
        set: function (value) {
            this.setPropertyValue("orientation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunnelSlice.prototype, "expandDistance", {
        /**
         * @return {number} expandDistance
         */
        get: function () {
            return this.getPropertyValue("expandDistance");
        },
        /**
         * A relative distance slice's sides should be bent to. It's relative to the
         * height of the slice.
         *
         * Zero (default) will mean the sides will be perfectly straight.
         *
         * Positive value will make them bend outwards, resulting in "puffed" slices.
         *
         * Negative values will make them bend inwards.
         *
         * @default 0
         * @param {number}
         */
        set: function (value) {
            this.setPropertyValue("expandDistance", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return FunnelSlice;
}(Container));
export { FunnelSlice };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["FunnelSlice"] = FunnelSlice;
//# sourceMappingURL=FunnelSlice.js.map