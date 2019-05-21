/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Resize a canvas
 */
import commandFactory from '../factory/command';
import Promise from 'core-js/library/es6/promise';
import consts from '../consts';

const {commandNames} = consts;

const command = {
    name: commandNames.RESIZE_IMAGE,

    /**
     * resize the canvas with given dimension
     * @param {Graphics} graphics - Graphics instance
     * @param {{width: number, height: number}} dimension - Max width & height
     * @returns {Promise}
     */
    execute(graphics, dimension) {
        return new Promise(resolve => {
            const canvas = graphics.getCanvas();
            const zoom = (dimension.width / (canvas.width / graphics.zoom));
            this.undoData.zoom = graphics.zoom;
            graphics.adjustCanvasZoomDimension(zoom);
            resolve();
        });
    },

    /**
     * @param {Graphics} graphics - Graphics instance
     * @returns {Promise}
     */
    undo(graphics) {
        graphics.adjustCanvasZoomDimension(this.undoData.zoom);

        return Promise.resolve();
    }
};

commandFactory.register(command);

module.exports = command;
