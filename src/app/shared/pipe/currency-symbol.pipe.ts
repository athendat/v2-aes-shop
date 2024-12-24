import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { select } from '@ngxs/store';

import { SettingState } from '../state/setting.state';

import { Values } from '../interface/setting.interface';
import { CurrencyState } from '../state/currency.state';


@Pipe({
    name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {


    selectedCurrency = select(SettingState.selectedCurrency);
    currencies = select(CurrencyState.currency);

    public symbol: string = '$';
    public setting: Values;

    private currencyPipe = inject(CurrencyPipe);

    transform(value: number | undefined, position: 'before_price' | 'after_price' | string = 'before_price'): string | number {
        if (!value) {
            value = 0;
        };

        const currency = this.currencies().data.find(currency => currency.id === this.selectedCurrency()?.id);
        value = Number(value);
        value = (value * currency?.exchange_rate!);

        this.symbol = currency?.symbol || '$';
        position = currency?.symbol_position!;

        let formattedValue = this.currencyPipe.transform(value, this.symbol);
        formattedValue = formattedValue?.replace(this.symbol, '')!;

        if (position === 'before_price') {
            return `${this.symbol} ${formattedValue}`;
        } else {
            return `${formattedValue} ${this.symbol}`;
        }
    }
}
