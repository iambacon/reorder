/**
 * jquery.cb.reorder.js
 *
 * Depends:
 * jquery.js v1.8+
 * jquery-ui.widget.js
 */

(function($) {
    $.widget("cb.reorder", {
        $sourceItem: null, // Item being dragged
        $items: null, // draggable items

        _create: function() {
            var self = this,
                el = self.element;

            $items = $(el).find('[draggable]');
            $items.each(function() {
                var $item = $(this);

                $item.addClass('cb-reorder-item');
                $item.on('dragstart', $.proxy(self._onDragStart, self));
                $item.on('dragover', $.proxy(self._onDragOver, self));
                $item.on('drop', $.proxy(self._onDrop, self));
            });
        },

        /**
         * Function: onDragStart
         * Handles the dragstart event.
         * @param {object} e The event.
         */
        _onDragStart: function(e) {
            var event = e.originalEvent,
                dt = event.dataTransfer;

            $sourceItem = $(event.target);
            dt.effectAllowed = 'move';
            dt.setData('text/html', $sourceItem.html());

            this._trigger('dragstart', null, null);
        },

        /**
         * Function: onDragOver
         * Handles the dragover event.
         * @param {object} e The event.
         */
        _onDragOver: function(e) {
            var event = e.originalEvent;

            // Without this drop event will not fire.
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';

            this._trigger('dragover', null, null);
        },

        /**
         * Function: onDrop
         * Handles the drop event.
         * @param {object} e The event.
         */
        _onDrop: function(e) {
            var event = e.originalEvent,
                $target = $(event.target);

            // make sure we drop onto correct area.    
            if (!$target.is($items)) {
                $target = $target.closest($items);
            }

            if ($sourceItem != $target) {
                $sourceItem.html($target.html());
                $target.html(event.dataTransfer.getData('text/html'));
            }

            this._trigger('drop', null, null);
        }
    });
}(jQuery));
