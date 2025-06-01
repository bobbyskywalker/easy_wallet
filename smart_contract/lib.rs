use anchor_lang::prelude::*;

#[account]
pub struct RiskHeaderAccount {
    pub total_records: u64,
}

#[account]
pub struct RiskRecordAccount {
    pub user_address: Pubkey,
    pub symbol_from: [u8; 16],
    pub symbol_to: [u8; 16],
    pub amount: f64,
    pub actual_price: f64,
    pub risk_score: u8,
    pub timestamp: i64,
}

impl RiskRecordAccount {
    pub const LEN: usize =       // discriminator
        32 +                     // user_address (Pubkey)
        16 +                     // symbol_from
        16 +                     // symbol_to
        8 +                      // amount (f64)
        8 +                      // actual_price (f64)
        1 +                      // risk_score (u8)
        8;                       // timestamp (i64)
}

declare_id!("GfzivBz7tq7oAMNhVwUKt1GLEuT2LbXudWvGSyJ3vqYk");

#[program]
pub mod your_project_name {
    use super::*;

    pub fn initialize_header(ctx: Context<InitializeHeader>) -> Result<()> {
        let header = &mut ctx.accounts.header;
        header.total_records = 0;
        Ok(())
    }

    pub fn add_record(
        ctx: Context<AddRecord>,
        user_address: Pubkey,
        symbol_from: String,
        symbol_to: String,
        amount: f64,
        actual_price: f64,
        risk_score: u8,
        timestamp: i64,
    ) -> Result<()> {
        let header = &mut ctx.accounts.header;
        let record = &mut ctx.accounts.record;
    
        fn str_to_fixed_16(s: &str) -> [u8; 16] {
            let mut buf = [0u8; 16];
            let bytes = s.as_bytes();
            let len = bytes.len().min(16);
            buf[..len].copy_from_slice(&bytes[..len]);
            buf
        }
    
        record.user_address = user_address;
        record.symbol_from  = str_to_fixed_16(&symbol_from);
        record.symbol_to    = str_to_fixed_16(&symbol_to);
        record.amount       = amount;
        record.actual_price = actual_price;
        record.risk_score   = risk_score;
        record.timestamp    = timestamp;
    
        header.total_records += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeHeader<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + 8,
        seeds = [b"risk-header"],
        bump
    )]
    pub header: Account<'info, RiskHeaderAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddRecord<'info> {
    #[account(mut)]
    pub header: Account<'info, RiskHeaderAccount>,

    #[account(
        init,
        payer = payer,
        space = 8 + RiskRecordAccount::LEN,
        seeds = [
            b"risk-record",
            header.total_records.to_le_bytes().as_ref()
        ],
        bump
    )]
    pub record: Account<'info, RiskRecordAccount>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}