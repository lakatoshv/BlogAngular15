import { ChartData } from './ChartData';
import { ChartOptions } from '../../models/chart/ChartOptions';
/**
 * Chart options default data.
 */
export const ChartOptionsData: ChartOptions = {
    Data: ChartData,
    View: [1600, 300],
    ShowXAxis: true,
    ShowYAxis: true,
    Gradient: false,
    ShowLegend: true,
    ShowXAxisLabel: true,
    ShowYAxisLabel: true,
    Timeline: true,
    ColorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    AutoScale: true
};
