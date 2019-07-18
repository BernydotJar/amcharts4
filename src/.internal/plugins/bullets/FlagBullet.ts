/**
 * Flag bullet module.
 */

/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Bullet, IBulletProperties, IBulletAdapters, IBulletEvents } from "../../charts/elements/Bullet";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { Label } from "../../core/elements/Label";
import { WavedRectangle } from "../../core/elements/WavedRectangle";
import { Line } from "../../core/elements/Line";
import { Sprite } from "../../core/Sprite";


/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */

/**
 * Defines properties for [[FlagBullet]].
 */
export interface IFlagBulletProperties extends IBulletProperties {

	/**
	 * Flag pole height in pixels.
	 *
	 * @default 10
	 */
	poleHeight?: number;

}

/**
 * Defines events for [[FlagBullet]].
 */
export interface IFlagBulletEvents extends IBulletEvents { }

/**
 * Defines adapters.
 * 
 * Includes both the [[Adapter]] definitions and properties.
 * @see {@link Adapter}
 */
export interface IFlagBulletAdapters extends IBulletAdapters, IFlagBulletProperties { }


/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */

/**
 * Creates a flag-shaped bullet with an optional text label inside it.
 *
 * The background/body of the flag is a [[WavedRectangle]] element. Most of
 * its the visual appearance is configured via `background` property.
 *
 * The size of a background adopts to the size of a label automatically. If
 * you don't want a label to be shown at all, you can set it to `undefined`. In
 * this case flag size will be of the `width`/`height` set directly on the
 * [[FlagBullet]].
 *
 * Uses [[Label]] instance to draw the label, so the label itself is
 * configurable.
 *
 * Example:
 * 
 * ```TypeScript
 * let series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * let flagBullet = series.bullets.push(new am4plugins_bullets.FlagBullet());
 * flagBullet.poleHeight = 15;
 * flagBullet.label.text = "{valueY}";
 * ```
 * ```JavaScript
 * var series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * var flagBullet = series.bullets.push(new am4plugins_bullets.FlagBullet());
 * flagBullet.poleHeight = 15;
 * flagBullet.label.text = "{valueY}";
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *     "bullets": [{
 *       "type": "FlagBullet",
 *       "poleHeight": 15,
 *       "label": {
 *         "text": "{valueY}"
 *       }
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.5.7
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IBulletEvents} for a list of available events
 * @see {@link IBulletAdapters} for a list of available Adapters
 */
export class FlagBullet extends Bullet {

	/**
	 * Defines available properties.
	 */
	public _properties!: IFlagBulletProperties;

	/**
	 * Defines available adapters.
	 */
	public _adapter!: IFlagBulletAdapters;

	/**
	 * Defines available events.
	 */
	public _events!: IFlagBulletEvents;

	/**
	 * A type for the background element.
	 */
	public _background: WavedRectangle;

	/**
	 * Label element.
	 */
	protected _label: Label;

	/**
	 * An element of type [[Line]] that represents flag's "pole".
	 * 
	 * To set actual height of the pole use `poleHeight` property, which
	 * indicates height of the pole in pixels from bottom of the pole to the
	 * bottom of the flag.
	 */
	public pole: Line;

	/**
	 * Constructor
	 */
	constructor() {
		super();

		this.className = "FlagBullet";
		let interfaceColors = new InterfaceColorSet();

		let background = this.background;
		background.fill = interfaceColors.getFor("alternativeBackground");
		background.fillOpacity = 1;
		background.events.on("propertychanged", this.invalidate, this, false);
		background.waveHeight = 1.5;
		background.waveLength = 7;
		background.setWavedSides(true, false, true, false);

		this.pole = this.createChild(Line);
		this.pole.strokeOpacity = 1;
		this.pole.stroke = background.fill;

		this.width = 22;
		this.height = 16;

		let label = new Label();
		label.fill = new InterfaceColorSet().getFor("background");
		label.padding(3, 5, 3, 5);
		label.dy = 1;
		label.events.on("propertychanged", this.invalidate, this, false);
		label.events.on("positionchanged", this.invalidate, this, false);

		this.label = label;

		this.poleHeight = 10;

		this.applyTheme();
	}

	/**
	 * Validates element:
	 * * Triggers events
	 * * Redraws the element
	 *
	 * @ignore Exclude from docs
	 */
	public validate() {
		super.validate();

		this.updateBackground();

		let background = this.background;

		this.pole.y1 = 0;
		this.pole.y2 = -this.poleHeight - background.pixelHeight;
		if (this.label) {
			this.label.y = -this.poleHeight - background.pixelHeight;
		}
	}


	/**
	 * Update the background to fit into specific dimensions.
	 *
	 * @ignore Exclude from docs
	 * @todo Make it protected?
	 */
	public updateBackground(): void {
		let background: Sprite = this._background; // accessing protected, as getter creates instance if it doesn't exist
		if (background) {

			let label = this.label;

			if (label) {
				background.x = label.maxLeft;
				background.width = label.measuredWidth;
				background.height = label.measuredHeight;
			}
			else {
				background.width = Math.abs(this.maxRight - this.maxLeft);
				background.height = Math.abs(this.maxBottom - this.maxTop);
			}

			background.y = - this.poleHeight - background.pixelHeight;
		}
	}

	/**
	 * A [[Label]] element for displaying within flag.
	 *
	 * Use it's `text` property to set actual text, e.g.:
	 *
	 * ```TypeScript
	 * flagBullet.text = "Hello";
	 * ```
	 * ```JavaScript
	 * flagBullet.text = "Hello";
	 * ```
	 * ```JSON
	 * {
	 *   // ...
	 *   "series": [{
	 *     // ...
	 *     "bullets": [{
	 *       "type": "FlagBullet",
	 *       "label": {
	 *         "text": "Hello"
	 *       }
	 *     }]
	 *   }]
	 * }
	 * ```
	 * @param  label  Label
	 */
	public set label(label: Label) {
		if (label) {
			this._label = label;
			this._disposers.push(label);
			label.parent = this;
			label.shouldClone = false;
		}
		else {
			if (this._label) {
				this._label.dispose();
			}
			this._label = label;
			this.invalidate();
		}
	}

	/**
	 * @return Label
	 */
	public get label(): Label {
		return this._label;
	}

	/**
	 * Copies all proprities and related stuff from another instance of
	 * [[FlagBullet]].
	 *
	 * @param source  Source element
	 */
	public copyFrom(source: this): void {
		if (source.label) {
			this.label = source.label.clone();
		}
		if (source.pole) {
			this.pole.copyFrom(source.pole);
		}
		super.copyFrom(source);
	}

	/**
	 * Creates and returns a background element.
	 *
	 * @ignore Exclude from docs
	 * @return Background
	 */
	public createBackground(): this["_background"] {
		return new WavedRectangle();
	}

	/**
	 * Flag pole height in pixels.
	 *
	 * @default 10
	 * @param  value  Height (px)
	 */
	public set poleHeight(value: number) {
		this.setPropertyValue("poleHeight", value, true);
	}

	/**
	 * @return Height (px)
	 */
	public get poleHeight(): number {
		return this.getPropertyValue("poleHeight");
	}
}

/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["FlagBullet"] = FlagBullet;
