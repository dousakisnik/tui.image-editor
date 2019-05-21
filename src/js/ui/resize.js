import Submenu from './submenuBase';
import templateHtml from './template/submenu/resize';

/**
 * Resize ui class
 * @class
 * @ignore
 */
class Resize extends Submenu {
    constructor(subMenuElement, {locale, iconStyle, menuBarPosition}) {
        super(subMenuElement, {
            locale,
            name: 'resize',
            iconStyle,
            menuBarPosition,
            templateHtml
        });

        this.status = 'active';
        this.ratio = 1;
        this._value = {
            width: 0,
            height: 0
        };

        this._els = {
            apply: this.selector('#tie-resize-button .apply'),
            cancel: this.selector('#tie-resize-button .cancel'),
            canvasWidth: this.selector('#tie-resize-canvas-width'),
            canvasHeight: this.selector('#tie-resize-canvas-height')
        };
    }

    /**
     * Add event for crop
     * @param {Object} actions - actions for resize
     *   @param {Function} actions.resize - resize action
     *   @param {Function} actions.cancel - cancel action
     *   @param {Function} actions.preset - draw rectzone at a predefined ratio
     */
    addEvent(actions) {
        this.actions = actions;
        this._els.apply.addEventListener('click', () => {
            // Add resize Canvas
            this.actions.resize(this._value);
            this._els.apply.classList.remove('active');
        });

        this._els.canvasWidth.addEventListener('change', e => {
            this._value = {
                width: parseInt(e.target.value, 10),
                height: parseInt(e.target.value / this._ratio, 10)
            };
            this._syncInputs({ });
        });
        this._els.canvasHeight.addEventListener('change', e => {
            this._value = {
                width: parseInt(e.target.value * this._ratio, 10),
                height: parseInt(e.target.value, 10)
            };
            this._syncInputs();
        });

        this._els.cancel.addEventListener('click', () => {
            this.actions.cancel();
            this._els.apply.classList.remove('active');
        });
    }

    /**
     * Executed when the menu starts.
     */
    changeStartMode() {
        this._getCanvasDimensions();
        this._syncInputs();
        this.actions.modeChange('resize');
    }

    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode() {
        this.actions.stopDrawingMode();
    }

    /**
     * Change apply button status
     * @param {Boolean} enableStatus - apply button status
     */
    changeApplyButtonStatus(enableStatus) {
        if (enableStatus) {
            this._els.apply.classList.add('active');
        } else {
            this._els.apply.classList.remove('active');
        }
    }

    /**
     * Sync the input boxes based on the image ratio
     */
    _syncInputs() {
        this._els.canvasWidth.value = this._value.width;
        this._els.canvasHeight.value = this._value.height;
    }

    /**
     * Set the input values
     *
     */
    _getCanvasDimensions() {
        const canvas = document.querySelector('.lower-canvas');
        this._ratio = canvas.width / canvas.height;
        this._value = {
            width: canvas.width,
            height: canvas.height
        };
    }
}

export default Resize;
