import { Subject } from '../Subject';
import { from } from '../observable/from';
import { operate } from '../util/lift';
import { fromSubscribable } from '../observable/fromSubscribable';
var DEFAULT_CONFIG = {
    connector: function () { return new Subject(); },
};
export function connect(selector, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connector = config.connector;
    return operate(function (source, subscriber) {
        var subject = connector();
        from(selector(fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
    });
}
//# sourceMappingURL=connect.js.map