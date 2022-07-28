export interface txContents {
    hash: string,
    from: number,
    to: string,
    value: number,
    data: string,
    gasLimit: number,
    nonce: number,
    maxPriorityFeePerGas: number,
    maxFeePerGas: number
}